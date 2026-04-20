import { Bell, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "@/redux/features/notification/notification.api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";
import type { NotificationItem } from "@/pages/Candidate/Notification/types";

export function Notifications() {
  const { data: response } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = response?.data || [];
  const unreadCount = response?.meta?.unreadCount || 0;

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative rounded-full p-2 hover:bg-muted-foreground/10"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        className="w-80 max-h-[450px] overflow-auto rounded-xl bg-white p-0 shadow-2xl border border-gray-100 z-60"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
          <h4 className="text-sm font-bold text-gray-900">Notifications</h4>
          {unreadCount > 0 && (
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
              {unreadCount} NEW
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {notifications.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center">
              <Bell className="w-8 h-8 text-gray-200 mb-2" />
              <p className="text-xs text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={cn(
                  "flex flex-col gap-1 p-4 transition-all duration-200 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0",
                  !notif.isRead && "bg-blue-50/30",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "text-sm line-clamp-2 leading-snug",
                      !notif.isRead
                        ? "font-bold text-gray-900"
                        : "text-gray-700",
                    )}
                  >
                    {notif.title}
                  </span>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </div>
                <span className="text-xs text-gray-500 line-clamp-1">
                  {notif.message}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-gray-400 font-medium tracking-tight">
                    {formatDistanceToNow(new Date(notif.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <Link
            to="/recruiter/notifications"
            className="block p-3 text-center text-xs font-bold text-primary hover:bg-gray-50 border-t border-gray-50 transition-colors"
          >
            View All Notifications
          </Link>
        )}
      </PopoverContent>
    </Popover>
  );
}
