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
        <h4>{user?.name ?? "rahul"}</h4>
      </div>

      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          {menu.map((item) => (
            <DropdownMenuItem key={item.title}>
              <Link to={item.url}>{item.title}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <button onClick={handelLogout}>
              {isLoading ? "logout..." : "Log out"}
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
