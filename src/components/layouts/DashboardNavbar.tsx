import { AvatarDropdown } from "../ui/DropdownMenuAvatar";
import { Separator } from "../ui/separator";
import DashboardSearch from "./DashboardSearch";
import { Notifications } from "./Notifications";

import { useLocation } from "react-router";

export default function DashboardNavbar() {
  const { pathname } = useLocation();
  const isRecruiter = pathname.startsWith("/recruiter");

  const dropdownMenu = [
    {
      title: "Dashboard",
      url: isRecruiter ? "/recruiter" : "/candidate",
    },
  ];
  return (
    <nav className="border-b">
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
        <div className="flex items-center gap-2 "></div>
        <div>
          <DashboardSearch />
        </div>
        <div className="flex gap-2">
          <Notifications />
          <Separator orientation="vertical" />
          <AvatarDropdown menu={dropdownMenu} />
        </div>
      </header>
    </nav>
  );
}
