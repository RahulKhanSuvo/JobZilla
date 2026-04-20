export interface NotificationItem {
  id: string;
  type:
    | "APPLICATION"
    | "MESSAGE"
    | "ALERT"
    | "INTERVIEW"
    | "SUCCESS"
    | "application"
    | "message"
    | "alert"
    | "interview"
    | "success";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}
