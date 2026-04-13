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
}

export default function SidebarNavItem({
  href,
  title,
  icon: Icon,
  isCollapsed,
  onClick,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
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
          {!isCollapsed && (
            <span className="whitespace-nowrap transition-opacity duration-150 overflow-hidden">
              {title}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
