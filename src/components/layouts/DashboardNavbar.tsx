import { AvatarDropdown } from "../ui/DropdownMenuAvatar";
import { Separator } from "../ui/separator";
import DashboardSearch from "./DashboardSearch";
import { Notifications } from "./Notifications";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCollapsed,
  toggleMobileOpen,
} from "@/redux/features/layout/sidebarSlice";
import { PanelLeft, Search } from "lucide-react";
import { Button } from "../ui/button";
import JobzillaLogo from "../common/JobzillaLogo";
import { Link } from "react-router";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { startConnecting } from "@/redux/features/chat/chatSlice";

export default function DashboardNavbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isConnected = useSelector((state: RootState) => state.chat.isConnected);
  const isRecruiter = pathname.startsWith("/recruiter");
  useEffect(() => {
    if (user && !isConnected) {
      dispatch(startConnecting());
    }
  }, [user, isConnected, dispatch]);

  const dropdownMenu = [
    {
      title: "Dashboard",
      url: isRecruiter ? "/recruiter" : "/candidate",
    },
  ];

  return (
    <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50 transition-all">
      <header className="flex justify-between h-16 shrink-0 items-center gap-4 px-4">
        {/* Left Side: Toggle + Logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-500 hover:text-primary"
            onClick={() => dispatch(toggleCollapsed())}
          >
            <PanelLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500 hover:text-primary"
            onClick={() => dispatch(toggleMobileOpen())}
          >
            <PanelLeft className="size-5" />
          </Button>
          <Separator
            orientation="vertical"
            className="hidden md:block h-6 mx-1"
          />
          <Link to="/" className="flex items-center">
            <JobzillaLogo className="scale-75 origin-left" />
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl hidden sm:block">
          <DashboardSearch />
        </div>

        {/* Right Side: Actions */}
        <div className="flex gap-2 items-center">
          <div className="sm:hidden">
            <Button variant="ghost" size="icon">
              <Search className="size-5 text-slate-500" />
            </Button>
          </div>
          <Notifications />
          <Separator orientation="vertical" className="h-6 mx-1" />
          <AvatarDropdown user={user} menu={dropdownMenu} />
        </div>
      </header>
    </nav>
  );
}
