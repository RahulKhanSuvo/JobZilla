import { NavLink } from "react-router";
import { useSidebar } from "./ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SidebarLinkProps {
  url: string;
  icon?: React.ElementType;
  title: string;
}

export function SidebarLink({ url, icon: Icon, title }: SidebarLinkProps) {
  const { state, isMobile } = useSidebar();

  return (
    <NavLink to={url} end>
      {({ isActive }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-[#004a8c] text-white shadow-lg shadow-blue-900/20 scale-[1.02]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-[#004a8c]"
                  }`}
              >
                {/* Icon container */}
                {Icon && (
                  <div className="flex items-center justify-center">
                    <Icon
                      className={`transition-all duration-300 ${
                        state === "collapsed" ? "size-6" : "size-5"
                      } ${isActive ? "text-white" : "group-hover:scale-110"}`}
                    />
                  </div>
                )}

                {/* Show text only when sidebar is expanded */}
                {state !== "collapsed" && (
                  <span
                    className={`text-[15px] font-semibold tracking-tight ${isActive ? "font-bold" : ""}`}
                  >
                    {title}
                  </span>
                )}
              </div>
            </TooltipTrigger>

            {/* Tooltip for collapsed sidebar */}
            {state === "collapsed" && !isMobile && (
              <TooltipContent side="right" align="center">
                {title}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </NavLink>
  );
}
