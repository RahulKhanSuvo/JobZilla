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
import SidebarNavItem from "./SidebarNavItem";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface SidebarItem {
  title: string;
  href: string;
  icon?: LucideIcon | IconType;
}

interface BaseSideBarProps {
  data: SidebarItem[];
  title: string;
}

export default function BaseSideBar({ data, title }: BaseSideBarProps) {
  const { isCollapsed, isMobileOpen } = useSelector(
    (state: RootState) => state.sidebar,
  );
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleLinkClick = () => {
    if (isMobile) {
      dispatch(setMobileOpen(false));
    }
  };

  const sidebarContent = (
    <ul className="space-y-1">
      {data.map((item, index) => (
        <li key={index}>
          <SidebarNavItem
            {...item}
            isCollapsed={isMobile ? false : isCollapsed}
            onClick={handleLinkClick}
          />
        </li>
      ))}
    </ul>
  );

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
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
          </VisuallyHidden>
          <div className="h-full pt-8 px-5 overflow-y-auto">
            {sidebarContent}
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
      {sidebarContent}
    </aside>
  );
}
