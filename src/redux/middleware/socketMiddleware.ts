import type { Middleware } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { io, Socket } from "socket.io-client";
import {
  startConnecting,
  connectionEstablished,
  connectionLost,
  disconnectSocket,
  sendMessage,
  receiveMessage,
  setActiveConversation,
  setTyping,
  startTyping,
} from "../features/chat/chatSlice";
import type { ChatMessage } from "../features/chat/chatSlice";
import { chatApi } from "../features/chat/chat.api";
import { notificationApi } from "../features/notification/notification.api";
import type { NotificationItem } from "@/pages/Candidate/Notification/types";

let socket: Socket | null = null;

const socketMiddleware: Middleware = (store) => (next) => (action) => {
  const isStartConnecting = startConnecting.match(action);
  const isDisconnecting = disconnectSocket.match(action);
  const isSendingMessage = sendMessage.match(action);

  if (isStartConnecting && !socket) {
    socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      withCredentials: true,
      autoConnect: true,
    });

    socket.on("connect", () => {
      store.dispatch(connectionEstablished());
      // Join notification room for the current user
      const state = store.getState();
      const userId = state.auth?.user?.id;
      if (userId && socket) {
        socket.emit("join_notifications", userId);
      }
    });

    socket.on("disconnect", () => {
      store.dispatch(connectionLost());
    });

    socket.on("new_message", (message: ChatMessage) => {
      store.dispatch(receiveMessage(message));
      (store.dispatch as AppDispatch)(
        chatApi.util.updateQueryData(
          "getMessages",
          message.conversationId,
          (draft) => {
            const data = draft as { data?: ChatMessage[] };
            if (data && data.data) {
              data.data.push(message);
            }
          },
        ),
      );
    });

    socket.on("new_notification", (notification: NotificationItem) => {
      (store.dispatch as AppDispatch)(
        notificationApi.util.updateQueryData(
          "getNotifications",
          undefined,
          (draft) => {
            if (draft && draft.data) {
              draft.data.unshift(notification);
              draft.meta.unreadCount += 1;
            }
          },
        ),
      );
    });
    socket.on(
      "typing",
      (data: { conversationId: string; senderId: string }) => {
        const state = store.getState();
        // Only show typing if it's for the active conversation and not from ourselves
        if (
          data.conversationId === state.chat.activeConversation &&
          data.senderId !== state.auth?.user?.id
        ) {
          store.dispatch(
            setTyping({ conversationId: data.conversationId, isTyping: true }),
          );
          // Auto-clear after 3 seconds in case the stop event is missed
          setTimeout(() => {
            store.dispatch(
              setTyping({
                conversationId: data.conversationId,
                isTyping: false,
              }),
            );
          }, 3000);
        }
      },
    );
  }

  if (isDisconnecting && socket) {
    socket.disconnect();
    socket = null;
  }

  if (isSendingMessage && socket) {
    const state = store.getState();
    const senderId = state.auth?.user?.id;
    // Emit event to the server
    socket.emit("send_message", {
      ...action.payload,
      senderId,
    });
  }

  const isSetActiveConversation = setActiveConversation.match(action);
  if (isSetActiveConversation && socket && action.payload) {
    socket.emit("join_conversation", action.payload);
  }

  if (startTyping.match(action) && socket) {
    const state = store.getState();
    const senderId = state.auth?.user?.id;
    socket.emit("typing", {
      conversationId: action.payload.conversationId,
      senderId,
    });
  }

  return next(action);
};

export default socketMiddleware;
