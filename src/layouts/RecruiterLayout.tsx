import RecruiterSideBar from "@/components/layouts/RecruiterSideBar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, ScrollRestoration } from "react-router";

export default function RecruiterLayout() {
  return (
    <SidebarProvider>
      <div className="h-screen w-full overflow-hidden">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <DashboardNavbar />
        </div>
        {/* Main Content with Sidebar */}
        <main className="flex overflow-y-auto h-[calc(100vh-64px)]">
          <ScrollRestoration getKey={(location) => location.pathname} />
          <RecruiterSideBar />
          <div className="flex-1 p-6 bg-[#F5F5F5] overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
