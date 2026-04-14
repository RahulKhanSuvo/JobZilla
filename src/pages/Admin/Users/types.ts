export type UserRole = "admin" | "candidate" | "recruiter";
export type UserStatus = "active" | "suspended" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  avatar?: string;
}

export const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "Rahul Islam",
    email: "rahul@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2024-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "candidate",
    status: "active",
    joinedDate: "2024-02-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "3",
    name: "Sarah Smith",
    email: "sarah@recruit.com",
    role: "recruiter",
    status: "active",
    joinedDate: "2024-02-20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "candidate",
    status: "suspended",
    joinedDate: "2024-03-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "candidate",
    status: "pending",
    joinedDate: "2024-03-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "6",
    name: "Alex Brown",
    email: "alex@recruit.com",
    role: "recruiter",
    status: "active",
    joinedDate: "2024-03-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];
