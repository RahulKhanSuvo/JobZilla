/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface ChatState {
  isConnected: boolean;
  activeConversation: string | null;
  isChatOpen: boolean;
  targetUser: { id: string; name: string } | null;
  isTyping: boolean;
  typingConversationId: string | null;
}

const initialState: ChatState = {
  isConnected: false,
  activeConversation: null,
  isChatOpen: false,
  targetUser: null,
  isTyping: false,
  typingConversationId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startConnecting: () => {
      // This action is caught by the middleware
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
    },
    connectionLost: (state) => {
      state.isConnected = false;
    },
    disconnectSocket: (state) => {
      // Caught by middleware to close socket
      state.isConnected = false;
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    openChatWidget: (
      state,
      action: PayloadAction<{ targetUserId: string; targetUserName: string }>,
    ) => {
      state.isChatOpen = true;
      state.targetUser = {
        id: action.payload.targetUserId,
        name: action.payload.targetUserName,
      };
    },
    closeChatWidget: (state) => {
      state.isChatOpen = false;
      state.targetUser = null;
      state.activeConversation = null;
    },
    sendMessage: (
      _state,
      _action: PayloadAction<{ conversationId: string; content: string }>,
    ) => {
      // Caught by middleware to emit event via socket
    },
    receiveMessage: (_state, _action: PayloadAction<ChatMessage>) => {
      // Handled when socket receives 'new_message'
    },
    startTyping: (
      _state,
      _action: PayloadAction<{ conversationId: string }>,
    ) => {
      // Caught by middleware to emit typing event via socket
    },
    setTyping: (
      state,
      action: PayloadAction<{ conversationId: string; isTyping: boolean }>,
    ) => {
      state.isTyping = action.payload.isTyping;
      state.typingConversationId = action.payload.isTyping
        ? action.payload.conversationId
        : null;
    },
    markMessagesAsRead: (
      _state,
      _action: PayloadAction<{ conversationId: string }>,
    ) => {
      // Caught by middleware to emit socket event
    },
  },
});

export const {
  startConnecting,
  connectionEstablished,
  connectionLost,
  disconnectSocket,
  setActiveConversation,
  openChatWidget,
  closeChatWidget,
  sendMessage,
  receiveMessage,
  startTyping,
  setTyping,
  markMessagesAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
