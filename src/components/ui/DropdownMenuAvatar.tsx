import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/redux/features/auth/auth.type";
import type { MenuItem } from "../layouts/NavBar/Navbar";
import { Link } from "react-router";
import { useUserLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { errorToast } from "@/utils/errorToast";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";
import { LogOut, User as UserIcon, Mail, ShieldCheck } from "lucide-react";
interface AvatarDropdownProps {
  user?: User;
  menu: MenuItem[];
}

export function AvatarDropdown({ user, menu }: AvatarDropdownProps) {
  const [logout, { isLoading }] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const handelLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logout successful");
      dispatch(logOut());
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>{user?.name ?? "Rak"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        className="w-64 p-2 shadow-2xl border-slate-200 dark:border-slate-800"
        align="end"
      >
        {/* User Header */}
        <div className="flex flex-col space-y-1 p-3 mb-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border-2 border-primary/10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user?.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                {user?.name || "User"}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                <ShieldCheck className="size-3" />
                {user?.role?.toLowerCase() || "member"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 truncate">
            <Mail className="size-3 shrink-0" />
            {user?.email}
          </div>
        </div>

        <DropdownMenuGroup className="space-y-1">
          {menu.map((item) => (
            <DropdownMenuItem key={item.title} asChild>
              <Link
                to={item.url}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800 outline-none"
              >
                <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                  {item.icon || <UserIcon className="size-4" />}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {item.title}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-slate-100 dark:bg-slate-800" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30 outline-none transition-colors"
            onClick={handelLogout}
            disabled={isLoading}
          >
            <div className="size-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <LogOut className="size-4" />
            </div>
            <span className="text-sm font-bold">
              {isLoading ? "Logging out..." : "Log out"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
