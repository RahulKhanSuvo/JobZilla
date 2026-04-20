import React from "react";
import { Bell, Loader2 } from "lucide-react";
import type { NotificationItem } from "./types";
import NotificationItemCard from "./components/NotificationItemCard";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/redux/features/notification/notification.api";

export default function Notification() {
  const { data: response, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotificationMutation] = useDeleteNotificationMutation();

  const notifications = response?.data || [];
  const unreadCount = response?.meta?.unreadCount || 0;

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const deleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteNotificationMutation(id);
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg border border-primary/20">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">
                You have {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 px-4 py-2 rounded-lg"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <Bell className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-lg font-medium text-gray-700">
                All caught up!
              </p>
              <p className="text-sm mt-1">
                You have no new notifications right now.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItemCard
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
                onDelete={deleteNotification}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
