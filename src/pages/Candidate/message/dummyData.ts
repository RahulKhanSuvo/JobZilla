import type { User, Conversation, ChatMessage } from "./types";

export const currentUser: User = {
  id: "me",
  name: "Candidate User",
  avatar: "https://i.pravatar.cc/150?u=me",
  role: "Candidate",
  status: "online",
};

export const contacts: User[] = [
  {
    id: "1",
    name: "Alice HR",
    avatar: "https://i.pravatar.cc/150?u=1",
    role: "Recruiter",
    status: "online",
  },
  {
    id: "2",
    name: "Bob Tech Lead",
    avatar: "https://i.pravatar.cc/150?u=2",
    role: "Interviewer",
    status: "offline",
  },
  {
    id: "3",
    name: "Charlie Manager",
    avatar: "https://i.pravatar.cc/150?u=3",
    role: "Hiring Manager",
    status: "online",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    participant: contacts[0],
    lastMessage: "Great, see you then!",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "c2",
    participant: contacts[1],
    lastMessage: "Please review the technical document.",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "c3",
    participant: contacts[2],
    lastMessage: "We would like to move forward.",
    timestamp: "Mon",
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: "m1",
      senderId: "1",
      text: "Hi! Thanks for applying to the Frontend role.",
      timestamp: "10:15 AM",
      isRead: true,
    },
    {
      id: "m2",
      senderId: "me",
      text: "Hello Alice, thank you for reaching out.",
      timestamp: "10:18 AM",
      isRead: true,
    },
    {
      id: "m3",
      senderId: "1",
      text: "Are you available for a quick chat tomorrow at 2 PM?",
      timestamp: "10:20 AM",
      isRead: true,
    },
    {
      id: "m4",
      senderId: "me",
      text: "Yes, that works perfectly for me.",
      timestamp: "10:25 AM",
      isRead: true,
    },
    {
      id: "m5",
      senderId: "1",
      text: "Great, see you then!",
      timestamp: "10:30 AM",
      isRead: false,
    },
  ],
  c2: [
    {
      id: "m1",
      senderId: "2",
      text: "Hello, I will be conducting your technical interview.",
      timestamp: "Yesterday",
      isRead: true,
    },
    {
      id: "m2",
      senderId: "2",
      text: "Please review the technical document.",
      timestamp: "Yesterday",
      isRead: true,
    },
  ],
  c3: [
    {
      id: "m1",
      senderId: "3",
      text: "We would like to move forward.",
      timestamp: "Mon",
      isRead: true,
    },
  ],
};
