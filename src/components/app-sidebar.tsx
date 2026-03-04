"use client";

import * as React from "react";
import {
  Bookmark,
  Briefcase,
  Building,
  ChartBar,
  FileCheck,
  History,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import { CandidateProfileCard } from "./CandidateProfileCard";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/candidate/dashboard",
      icon: ChartBar,
    },
    {
      title: "Profile",
      url: "/candidate/profile",
      icon: User,
    },
    {
      title: "Applied Jobs",
      url: "/candidate/applied-job",
      icon: FileCheck,
    },
    {
      title: "Saved Jobs",
      url: "/candidate/save-job",
      icon: Bookmark,
    },
    {
      title: "Followed Companies",
      url: "/candidate/followed-companies",
      icon: Building,
    },
    {
      title: "Recent Jobs",
      url: "/candidate/recent-jobs",
      icon: History,
    },
    {
      title: "Settings",
      url: "/candidate/setting",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#004a8c] text-white shadow-lg shadow-blue-900/10">
            <Briefcase className="size-6" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-2xl tracking-tighter text-[#004a8c]">
              atB
            </span>
            <span className="font-bold text-2xl tracking-tight text-slate-500">
              Jobs
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide px-2">
        <CandidateProfileCard />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <div className="p-2 border-t border-sidebar-border mt-auto">
          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors group">
            <LogOut className="size-4 group-hover:translate-x-0.5 transition-transform" />
            <span>Log out</span>
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
