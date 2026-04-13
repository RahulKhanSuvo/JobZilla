import { NavLink } from "react-router";
import { candidateSidebarData } from "./sidebarData";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";

export default function CandidateSideBar() {
  const { isCollapsed } = useSelector((state: RootState) => state.sidebar);

  return (
    <aside
      className={cn(
        "py-6 bg-white dark:bg-slate-900 sticky top-0 z-50 overflow-y-auto border-r border-border/50 dark:border-border/20 transition-all duration-300 ease-in-out h-[calc(100vh-65px)]",
        isCollapsed ? "w-[80px] px-2" : "w-[280px] px-5",
      )}
    >
      <ul className="space-y-1">
        {candidateSidebarData.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
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
    </aside>
  );
}
