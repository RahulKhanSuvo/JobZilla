export interface User {
  id: string;
  profileId: string;
  name: string;
  avatar: string;
  role: string;
  status: "online" | "offline";
  location?: string;
  about?: string;
  companyName?: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}
