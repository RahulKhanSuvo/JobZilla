export interface NotificationItem {
  id: string;
  type: "application" | "message" | "alert" | "interview" | "success";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}
