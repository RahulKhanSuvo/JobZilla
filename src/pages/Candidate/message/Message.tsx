import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import MessageSidebar from "./components/MessageSidebar";
import ChatArea from "./components/ChatArea";
import ProfileDetails from "./components/ProfileDetails";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/redux/features/chat/chat.api";
import {
  startConnecting,
  sendMessage,
  setActiveConversation,
  startTyping,
} from "@/redux/features/chat/chatSlice";
import type { RootState } from "@/redux/store";

interface DbParticipant {
  id: string;
  name: string;
  role: string;
  candidate?: {
    avatar: string | null;
    aboutMe: string | null;
    location: string | null;
  };
  company?: {
    logo: string | null;
    description: string | null;
    location: string | null;
  };
}

interface DbConversation {
  id: string;
  participantA: string;
  participantB: string;
  userA: DbParticipant;
  userB: DbParticipant;
  updatedAt: string;
  messages?: { content: string }[];
}

interface DbMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export default function Message() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const { isConnected, isTyping } = useSelector(
    (state: RootState) => state.chat,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Initialize socket natively on page load
  useEffect(() => {
    if (!isConnected) {
      dispatch(startConnecting());
    }
  }, [isConnected, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(setActiveConversation(id));
    }
  }, [id, dispatch]);

  // Fetch API Queries
  const { data: conversationsResponse } = useGetConversationsQuery(undefined);
  const { data: messagesResponse } = useGetMessagesQuery(id!, { skip: !id });

  // Transform backend conversation schema to what UI expects temporarily
  const dbConversations: DbConversation[] = conversationsResponse?.data || [];
  const mappedConversations = dbConversations.map((conv) => {
    const isUserA = conv.participantA === user?.id;
    const participantData = isUserA ? conv.userB : conv.userA;

    const avatar =
      participantData.candidate?.avatar ||
      participantData.company?.logo ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${participantData.name}`;
    const location =
      participantData.candidate?.location || participantData.company?.location;
    const about =
      participantData.candidate?.aboutMe ||
      participantData.company?.description;

    return {
      id: conv.id,
      timestamp: new Date(conv.updatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lastMessage: conv.messages?.[0]?.content || "Started conversation",
      unreadCount: 0,
      participant: {
        id: participantData.id,
        name: participantData.name,
        avatar: avatar,
        status: "offline" as const,
        role: participantData.role === "EMPLOYER" ? "Recruiter" : "Candidate",
        location: location || undefined,
        about: about || undefined,
      },
    };
  });

  const activeConversation =
    mappedConversations.find((c) => c.id === id) || null;

  // Transform backend messages to what ChatArea expects
  const dbMessages: DbMessage[] = messagesResponse?.data || [];
  const currentMessages = dbMessages.map((msg) => ({
    id: msg.id,
    senderId: msg.senderId === user?.id ? "me" : msg.senderId,
    text: msg.content,
    timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isRead: msg.isRead,
  }));

  const handleSendMessage = (text: string) => {
    if (!id) return;
    dispatch(sendMessage({ conversationId: id, content: text }));
  };

  const handleTyping = () => {
    if (id) dispatch(startTyping({ conversationId: id }));
  };

  const basePath = window.location.pathname.startsWith("/recruiter")
    ? "/recruiter/messages"
    : "/candidate/messages";

  const handleSelectConversation = (convId: string) => {
    navigate(`${basePath}/${convId}`);
  };

  const handleBack = () => {
    navigate(basePath);
  };

  return (
    <div className="flex h-[calc(100vh-150px)] overflow-hidden bg-gray-50 border border-gray-200">
      {/* Sidebar - hidden on mobile if a conversation is active */}
      <div
        className={`w-full md:w-auto h-full absolute inset-0 md:static transition-transform duration-300 z-10 ${
          id ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        }`}
      >
        <MessageSidebar
          conversations={mappedConversations}
          activeConversationId={id || null}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Chat Area - hidden on mobile if NO conversation is active */}
      <div
        className={`flex-1 h-full w-full absolute inset-0 md:static transition-transform duration-300 z-20 md:z-auto ${
          id ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <ChatArea
          conversation={activeConversation}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
          isTyping={isTyping}
          onTyping={handleTyping}
          onToggleProfile={() => setShowProfile(!showProfile)}
          showProfile={showProfile}
        />
      </div>

      {/* Profile Sidebar - hidden if not active or on mobile */}
      {showProfile && activeConversation && (
        <div className="hidden lg:block h-full">
          <ProfileDetails
            user={activeConversation.participant}
            onClose={() => setShowProfile(false)}
          />
        </div>
      )}

      {/* Mobile Profile Overlay */}
      {showProfile && activeConversation && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex justify-end">
          <ProfileDetails
            user={activeConversation.participant}
            onClose={() => setShowProfile(false)}
          />
        </div>
      )}
    </div>
  );
}
