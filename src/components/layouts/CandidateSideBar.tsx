import { NavLink } from "react-router";
import { candidateSidebarData } from "./sidebarData";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { setMobileOpen } from "@/redux/features/layout/sidebarSlice";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

/* ── Internal Component: Navigation List ────────────────────────── */
function SidebarContent({ isCollapsed }: { isCollapsed?: boolean }) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleLinkClick = () => {
    if (isMobile) {
      dispatch(setMobileOpen(false));
    }
  };

  return (
    <ul className="space-y-1">
      {candidateSidebarData.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.href}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              cn(
                "flex items-center group text-base font-semibold py-3.5 rounded transition-all duration-300",
                isCollapsed ? "justify-center px-0" : "gap-2.5 px-3.5",
                isActive
                  ? "bg-[#F5F5F5] dark:bg-slate-800 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-[#F5F5F5] dark:hover:bg-slate-800 dark:hover:text-white",
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.icon && (
                  <item.icon
                    className={cn(
                      "size-6 group-hover:text-primary transition-colors duration-300",
                      isActive
                        ? "text-primary dark:text-primary"
                        : "text-[#64666c] dark:text-gray-400",
                    )}
                  />
                )}
                {!isCollapsed && (
                  <span className="whitespace-nowrap transition-opacity duration-300 overflow-hidden">
                    {item.title}
                  </span>
                )}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

/* ── Main Export: Responsive Sidebar ────────────────────────────── */
export default function CandidateSideBar() {
  const { isCollapsed, isMobileOpen } = useSelector(
    (state: RootState) => state.sidebar,
  );
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  // 1. Mobile View (Sheet)
  if (isMobile) {
    return (
      <Sheet
        open={isMobileOpen}
        onOpenChange={(open) => dispatch(setMobileOpen(open))}
      >
        <SheetContent
          side="left"
          className="p-0 w-[280px] bg-white dark:bg-slate-900 border-r-0"
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
          </VisuallyHidden>
          <div className="h-full pt-8 px-5 overflow-y-auto">
            <SidebarContent isCollapsed={false} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // 2. Desktop View (Static aside)
  return (
    <aside
      className={cn(
        "py-6 bg-white dark:bg-slate-900 sticky top-0 z-50 overflow-y-auto border-r border-border/50 dark:border-border/20 transition-all duration-300 ease-in-out h-[calc(100vh-65px)]",
        isCollapsed ? "w-[80px] px-2" : "w-[280px] px-5",
      )}
    >
      <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
