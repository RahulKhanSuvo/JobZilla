import { AppSidebar } from "@/components/app-sidebar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router";

export default function CandidateLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-4 bg-[#f5f7f9]">
          <ScrollRestoration getKey={(location) => location.pathname} />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
