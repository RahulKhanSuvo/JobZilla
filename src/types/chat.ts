export interface ChatParticipant {
  id: string;
  name: string;
  role: string;
  candidate?: {
    id: string;
    avatar: string | null;
    aboutMe: string | null;
    location: string | null;
  };
  company?: {
    id: string;
    logo: string | null;
    description: string | null;
    location: string | null;
  };
}

export interface ChatConversation {
  id: string;
  participantA: string;
  participantB: string;
  userA: ChatParticipant;
  userB: ChatParticipant;
  updatedAt: string;
  messages?: { content: string }[];
  _count?: {
    messages: number;
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}
