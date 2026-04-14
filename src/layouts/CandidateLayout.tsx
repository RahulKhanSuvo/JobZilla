import CandidateSideBar from "@/components/layouts/CandidateSideBar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { Outlet, ScrollRestoration } from "react-router";

export default function CandidateLayout() {
  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-[#F5F5F5] dark:bg-slate-950">
      <DashboardNavbar />

      <main className="flex flex-1 overflow-hidden">
        <ScrollRestoration getKey={(location) => location.pathname} />

        {/* Responsive Sidebar (Handles itself internally) */}
        <CandidateSideBar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
