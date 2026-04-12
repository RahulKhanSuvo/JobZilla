import React, { useState } from "react";
import { Bell } from "lucide-react";
import { mockNotifications } from "./dummyData";
import type { NotificationItem } from "./types";
import NotificationItemCard from "./components/NotificationItemCard";

export default function Notification() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    // Mark as read specifically if clicked
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n,
      ),
    );

    // In a real app, you would navigate to the link here if it exists
    // if (notification.link) navigate(notification.link);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
                You have {unreadCount} unread message
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
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
