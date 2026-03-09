import { NavLink } from "react-router";
import { candidateSidebarData } from "./sidebarData";

export default function CandidateSideBar() {
  return (
    <aside className="py-6 px-5 w-[280px] h-[calc(100vh-65px)] bg-white dark:bg-slate-900 sticky top-0 z-50 overflow-y-auto border-r border-border/50 dark:border-border/20">
      <ul className="space-y-1">
        {candidateSidebarData.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3.5 group text-base font-semibold py-3.5 rounded transition ${
                  isActive
                    ? "bg-[#F5F5F5] dark:bg-slate-800 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-[#F5F5F5] dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.icon && (
                    <item.icon
                      className={`size-6 group-hover:text-primary transition ${isActive ? "text-primary dark:text-primary" : "text-[#64666c] dark:text-gray-400"}`}
                    />
                  )}
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
