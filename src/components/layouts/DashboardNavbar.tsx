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
import { PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import JobzillaLogo from "../common/JobzillaLogo";
import { Link } from "react-router";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { startConnecting } from "@/redux/features/chat/chatSlice";
import { ModeToggle } from "./ModeToggle";

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
    <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <header className="flex justify-between h-16 shrink-0 items-center gap-4 px-4 sm:px-6">
        {/* Left Side: Toggle + Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
            onClick={() => dispatch(toggleCollapsed())}
          >
            <PanelLeft className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
            onClick={() => dispatch(toggleMobileOpen())}
          >
            <PanelLeft className="size-5" />
          </Button>
          <Separator orientation="vertical" className="hidden md:block h-6" />
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <JobzillaLogo className="scale-[0.85] origin-left" />
          </Link>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="flex-1 max-w-xl hidden lg:block px-4">
          <DashboardSearch />
        </div>

        {/* Right Side: Actions */}
        <div className="flex gap-1.5 sm:gap-3 items-center">
          <ModeToggle />
          <Notifications />
          <div className="hidden sm:block">
            <Separator orientation="vertical" className="h-6" />
          </div>
          <AvatarDropdown user={user} menu={dropdownMenu} />
        </div>
      </header>
    </nav>
  );
}
