"use client";

import { Bell, Check, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { cn } from "@/lib/utils"; // your tailwind cn utility

interface Notification {
  id: string;
  title: string;
  description?: string;
  time?: string;
  read?: boolean;
  type?: "info" | "success" | "error";
}

const demoNotifications: Notification[] = [
  {
    id: "1",
    title: "New Job Application",
    description: "You applied for Frontend Developer at Acme Corp",
    time: "2h ago",
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Profile Viewed",
    description: "Someone viewed your profile",
    time: "5h ago",
    read: true,
    type: "info",
  },
  {
    id: "3",
    title: "Job Approved",
    description: "Your job application has been approved",
    time: "1d ago",
    read: false,
    type: "success",
  },
  {
    id: "4",
    title: "Error Processing",
    description: "There was an error updating your profile",
    time: "2d ago",
    read: false,
    type: "error",
  },
];

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative rounded-full p-2 hover:bg-muted-foreground/10"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {demoNotifications.some((n) => !n.read) && (
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        className="w-80 max-h-96 overflow-auto rounded-md bg-background p-4 shadow-lg"
      >
        <h4 className="mb-2 text-sm font-semibold">Notifications</h4>
        <div className="flex flex-col gap-2">
          {demoNotifications.length === 0 && (
            <p className="text-sm text-muted-foreground">No notifications</p>
          )}
          {demoNotifications.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "flex flex-col rounded-md p-2 transition-colors hover:bg-muted",
                !notif.read && "bg-muted-foreground/10",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{notif.title}</span>
                {notif.type === "success" && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
                {notif.type === "error" && (
                  <X className="w-4 h-4 text-red-500" />
                )}
              </div>
              {notif.description && (
                <span className="text-xs text-muted-foreground">
                  {notif.description}
                </span>
              )}
              {notif.time && (
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {notif.time}
                </span>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
