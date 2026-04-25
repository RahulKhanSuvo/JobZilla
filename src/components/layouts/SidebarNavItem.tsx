import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface SidebarNavItemProps {
  href: string;
  title: string;
  icon?: LucideIcon | IconType;
  isCollapsed?: boolean;
  onClick?: () => void;
  badge?: number;
}

export default function SidebarNavItem({
  href,
  title,
  icon: Icon,
  isCollapsed,
  onClick,
  badge,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center group text-base font-semibold py-3.5 rounded transition-all duration-300 relative",
          isCollapsed ? "justify-center px-0" : "gap-2.5 px-3.5",
          isActive
            ? "bg-[#F5F5F5] dark:bg-slate-800 dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-[#F5F5F5] dark:hover:bg-slate-800 dark:hover:text-white",
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="relative">
            {Icon && (
              <Icon
                className={cn(
                  "size-6 group-hover:text-primary transition-colors duration-300",
                  isActive
                    ? "text-primary dark:text-primary"
                    : "text-[#64666c] dark:text-gray-400",
                )}
              />
            )}
            {isCollapsed && badge && badge > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold ring-2 ring-white dark:ring-slate-900 animate-in zoom-in duration-300">
                {badge > 9 ? "9+" : badge}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex flex-1 items-center justify-between min-w-0">
              <span className="whitespace-nowrap transition-opacity duration-150 overflow-hidden truncate">
                {title}
              </span>
              {badge && badge > 0 && (
                <span className="flex h-5 px-1.5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold animate-in zoom-in duration-300">
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}
