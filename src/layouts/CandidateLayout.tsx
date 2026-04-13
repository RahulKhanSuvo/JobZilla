import CandidateSideBar from "@/components/layouts/CandidateSideBar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { Outlet, ScrollRestoration } from "react-router";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setMobileOpen } from "@/redux/features/layout/sidebarSlice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function CandidateLayout() {
  const { isMobileOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-[#F5F5F5] dark:bg-slate-950">
      <DashboardNavbar />

      <main className="flex flex-1 overflow-hidden">
        <ScrollRestoration getKey={(location) => location.pathname} />

        {/* Desktop Sidebar */}
        <div className="hidden md:block h-full">
          <CandidateSideBar />
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet
          open={isMobileOpen}
          onOpenChange={(open) => dispatch(setMobileOpen(open))}
        >
          <SheetContent
            side="left"
            className="p-0 w-[280px] bg-white dark:bg-slate-900 border-r-0"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <div className="h-full pt-4">
              <CandidateSideBar />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
