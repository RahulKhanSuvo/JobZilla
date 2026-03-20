import { NavLink } from "react-router";
import { recruiterSidebarData } from "./sidebarData";

export default function RecruiterSideBar() {
  return (
    <aside className="py-6 px-5 w-[280px] h-[calc(100vh-65px)] bg-white sticky top-0 z-50 overflow-y-auto border-r border-border/50">
      <ul className="space-y-1">
        {recruiterSidebarData.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3.5 group text-base font-semibold py-3.5 rounded transition ${
                  isActive ? "bg-[#F5F5F5]" : "text-gray-600 hover:bg-[#F5F5F5]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.icon && (
                    <item.icon
                      className={`size-6 group-hover:text-primary ${isActive ? "text-primary" : "text-[#64666c]"}`}
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
