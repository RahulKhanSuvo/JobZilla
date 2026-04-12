import type { NotificationItem } from "./types";

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "success",
    title: "Application Shortlisted",
    message:
      "Congratulations! Your application for Senior React Developer at TechCorp has been shortlisted. The recruiter will contact you soon.",
    timestamp: "2 hours ago",
    isRead: false,
    link: "/candidate/applied-jobs",
  },
  {
    id: "n2",
    type: "message",
    title: "New Message from Alice HR",
    message:
      "Are you available for a quick chat tomorrow at 2 PM regarding your application?",
    timestamp: "5 hours ago",
    isRead: false,
    link: "/candidate/messages",
  },
  {
    id: "n3",
    type: "interview",
    title: "Interview Scheduled",
    message:
      "Your technical interview for Full Stack Engineer at InnovateIt is scheduled for Tomorrow, 10:00 AM.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "n4",
    type: "application",
    title: "Application Viewed",
    message:
      "Global Systems Inc. has viewed your application for the Frontend Developer position.",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "n5",
    type: "alert",
    title: "Profile Incomplete",
    message:
      "Please update your profile with a recent resume to increase your chances of getting hired.",
    timestamp: "3 days ago",
    isRead: true,
    link: "/candidate/setting",
  },
];
