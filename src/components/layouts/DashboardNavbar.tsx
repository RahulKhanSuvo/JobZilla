import { AvatarDropdown } from "../ui/DropdownMenuAvatar";
import { Separator } from "../ui/separator";
import DashboardSearch from "./DashboardSearch";
import { Notifications } from "./Notifications";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  toggleCollapsed,
  toggleMobileOpen,
} from "@/redux/features/layout/sidebarSlice";
import { PanelLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function DashboardNavbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isRecruiter = pathname.startsWith("/recruiter");

  const dropdownMenu = [
    {
      title: "Dashboard",
      url: isRecruiter ? "/recruiter" : "/candidate",
    },
  ];

  return (
    <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => dispatch(toggleCollapsed())}
          >
            <PanelLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(toggleMobileOpen())}
          >
            <PanelLeft className="size-5" />
          </Button>
        </div>
        <div>
          <DashboardSearch />
        </div>
        <div className="flex gap-2 items-center">
          <Notifications />
          <Separator orientation="vertical" className="h-6" />
          <AvatarDropdown menu={dropdownMenu} />
        </div>
      </header>
    </nav>
  );
}
