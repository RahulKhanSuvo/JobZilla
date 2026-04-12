import { useState } from "react";
import MessageSidebar from "./components/MessageSidebar";
import ChatArea from "./components/ChatArea";
import { mockConversations, mockMessages } from "./dummyData";
import type { ChatMessage } from "./types";

export default function Message() {
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] =
    useState<Record<string, ChatMessage[]>>(mockMessages);

  const activeConversation =
    mockConversations.find((c) => c.id === activeConversationId) || null;
  const currentMessages = activeConversationId
    ? messages[activeConversationId] || []
    : [];

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeConversationId]: [
        ...(prev[activeConversationId] || []),
        newMessage,
      ],
    }));
  };

  const handleBack = () => {
    setActiveConversationId(null);
  };

  return (
    <div className="flex h-[calc(100vh-150px)] overflow-hidden bg-gray-50 border border-gray-200">
      {/* Sidebar - hidden on mobile if a conversation is active */}
      <div
        className={`w-full md:w-auto h-full absolute inset-0 md:static transition-transform duration-300 z-10 ${
          activeConversationId
            ? "-translate-x-full md:translate-x-0"
            : "translate-x-0"
        }`}
      >
        <MessageSidebar
          conversations={mockConversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
        />
      </div>

      {/* Chat Area - hidden on mobile if NO conversation is active */}
      <div
        className={`flex-1 h-full w-full absolute inset-0 md:static transition-transform duration-300 z-20 md:z-auto ${
          activeConversationId
            ? "translate-x-0"
            : "translate-x-full md:translate-x-0"
        }`}
      >
        <ChatArea
          conversation={activeConversation}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
