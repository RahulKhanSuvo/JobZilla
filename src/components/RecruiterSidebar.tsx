"use client";

import * as React from "react";
import {
  Briefcase,
  LayoutDashboard,
  FilePlus,
  Users,
  Settings,
  LogOut,
  Building,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { RecruiterProfileCard } from "./RecruiterProfileCard";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Recruiting",
      url: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Post New Job",
      url: "/recruiter/post-job",
      icon: FilePlus,
    },
    {
      title: "Manage Jobs",
      url: "/recruiter/manage-jobs",
      icon: Briefcase,
    },
    {
      title: "All Applicants",
      url: "/recruiter/applicants",
      icon: Users,
    },
    {
      title: "Company Profile",
      url: "/recruiter/profile",
      icon: Building,
    },
    {
      title: "Settings",
      url: "/recruiter/setting",
      icon: Settings,
    },
  ],
};

export function RecruiterSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
        <RecruiterProfileCard />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
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
