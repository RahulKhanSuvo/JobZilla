import CandidateSideBar from "@/components/layouts/CandidateSideBar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router";

export default function CandidateLayout() {
  return (
    <SidebarProvider>
      <div className="h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div className="sticky top-0 z-50">
          <DashboardNavbar />
        </div>
        {/* Right Section */}
        <main className="flex overflow-y-auto h-[calc(100vh-64px)]">
          <ScrollRestoration getKey={(location) => location.pathname} />
          <CandidateSideBar />
          <div className="flex-1 p-6 bg-[#F5F5F5] dark:bg-background overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
