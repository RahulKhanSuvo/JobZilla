import {
  Briefcase,
  MessageSquare,
  AlertCircle,
  Calendar,
  CheckCircle,
  Bell,
  Trash2,
} from "lucide-react";
import type { NotificationItem } from "../types";

interface NotificationItemCardProps {
  notification: NotificationItem;
  onClick: (notification: NotificationItem) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export default function NotificationItemCard({
  notification,
  onClick,
  onDelete,
}: NotificationItemCardProps) {
  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "application":
        return <Briefcase className="w-5 h-5 text-blue-500" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "interview":
        return <Calendar className="w-5 h-5 text-indigo-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = (type: NotificationItem["type"]) => {
    switch (type) {
      case "application":
        return "bg-blue-100";
      case "message":
        return "bg-purple-100";
      case "alert":
        return "bg-orange-100";
      case "interview":
        return "bg-indigo-100";
      case "success":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      onClick={() => onClick(notification)}
      className={`p-5 lg:p-6 flex gap-4 transition-all duration-200 cursor-pointer group ${
        notification.isRead
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50/40 hover:bg-blue-50"
      }`}
    >
      <div className="shrink-0 mt-1">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(notification.type)}`}
        >
          {getIcon(notification.type)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
          <h3
            className={`text-base leading-tight truncate pr-4 ${notification.isRead ? "font-medium text-gray-800" : "font-semibold text-gray-900"}`}
          >
            {notification.title}
          </h3>
          <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
            {notification.timestamp}
          </span>
        </div>
        <p
          className={`text-sm leading-relaxed mt-1 ${notification.isRead ? "text-gray-500" : "text-gray-700 font-medium"}`}
        >
          {notification.message}
        </p>

        {notification.link && (
          <div className="mt-2.5">
            <span className="text-xs font-semibold text-primary inline-flex items-center hover:underline cursor-pointer">
              View details
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-start sm:items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => onDelete(notification.id, e)}
          className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
          title="Delete notification"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Unread dot indicator */}
      {!notification.isRead && (
        <div className="shrink-0 self-center hidden sm:flex justify-center w-4">
          <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
        </div>
      )}
    </div>
  );
}
