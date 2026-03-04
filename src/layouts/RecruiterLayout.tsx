import { RecruiterSidebar } from "@/components/RecruiterSidebar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function RecruiterLayout() {
  return (
    <SidebarProvider>
      <RecruiterSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <DashboardNavbar />
        <main className="flex-1 p-4 bg-[#f0f4f8]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
