import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Bookmark,
  User,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../ModeToggle";
import { Link, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logOut } from "@/redux/features/auth/authSlice";
import { useUserLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { errorToast } from "@/utils/errorToast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarDropdown } from "@/components/ui/DropdownMenuAvatar";
import JobzillaLogo from "@/components/common/JobzillaLogo";
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src?: string;
    alt?: string;
    className?: string;
  };
  menu?: MenuItem[];
  dropdownMenu?: MenuItem[];
  dropdownMenuEmployer?: MenuItem[];
  dropdownMenuAdmin?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Find Jobs",
      url: "/find-job",
    },
    {
      title: "About Us",
      url: "/about",
    },
    {
      title: "Contact Us",
      url: "/contact",
    },
  ],
  dropdownMenu = [
    {
      title: "Dashboard",
      url: "/candidate",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Saved Jobs",
      url: "/candidate/saved-jobs",
      icon: <Bookmark className="size-4" />,
    },
    {
      title: "Account Settings",
      url: "/candidate/settings",
      icon: <Settings className="size-4" />,
    },
    {
      title: "Help Center",
      url: "/help",
      icon: <HelpCircle className="size-4" />,
    },
  ],
  dropdownMenuEmployer = [
    {
      title: "Dashboard",
      url: "/recruiter",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Profile",
      url: "/recruiter/profile",
      icon: <User className="size-4" />,
    },
    {
      title: "Account Settings",
      url: "/recruiter/settings",
      icon: <Settings className="size-4" />,
    },
  ],
  dropdownMenuAdmin = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: <User className="size-4" />,
    },
    {
      title: "Account Settings",
      url: "/admin/settings",
      icon: <Settings className="size-4" />,
    },
  ],
  auth = {
    login: { title: "Login", url: "auth/login" },
    signup: { title: "Sign up", url: "auth/sign-up" },
  },
  className,
}: Navbar1Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isLoading }] = useUserLogoutMutation();

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...");
      await logout().unwrap();
      toast.dismiss();
      toast.success("Logout successful");
      dispatch(logOut());
      setIsOpen(false);
    } catch (error) {
      toast.dismiss();
      errorToast(error);
    }
  };

  const userImage = user?.candidate?.avatar || user?.company?.logo;
  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <section
      className={cn("py-4 bg-white dark:bg-slate-950 shadow ", className)}
    >
      <div className="max-w-[1905px] mx-auto px-4 lg:px-10">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex-1 flex items-center">
            {/* Logo */}
            <Link to={logo.url}>
              <JobzillaLogo />
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1 ">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex justify-end flex-1 items-center gap-1.5">
            <div>
              <ModeToggle />
            </div>
            {!user ? (
              <>
                <Button
                  className="rounded w-[185px] h-[48px]"
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link to={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  className="rounded w-[185px] h-[48px]"
                  asChild
                  size="sm"
                >
                  <Link to={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <>
                <AvatarDropdown
                  menu={
                    user.role === "EMPLOYER"
                      ? dropdownMenuEmployer
                      : user.role === "ADMIN"
                        ? dropdownMenuAdmin
                        : dropdownMenu
                  }
                  user={user}
                />
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logo.url}>
              <JobzillaLogo />
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
              {user && (
                <Link
                  to={user.role === "EMPLOYER" ? "/recruiter" : "/candidate"}
                >
                  <Avatar className="size-9 border-2 border-primary/10">
                    <AvatarImage src={userImage} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="size-9">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[350px] p-0 flex flex-col"
                >
                  <SheetHeader className="p-6 border-b text-left">
                    <SheetTitle className="flex items-center justify-between font-bold">
                      <Link to={logo.url} onClick={() => setIsOpen(false)}>
                        <JobzillaLogo />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    {/* User Profile Section at Top (if logged in) */}
                    {user && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                        <Link
                          to={
                            user.role === "EMPLOYER"
                              ? "/recruiter"
                              : "/candidate"
                          }
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 group"
                        >
                          <Avatar className="size-12 border-2 border-white dark:border-slate-800 shadow-sm group-hover:border-primary transition-all">
                            <AvatarImage src={userImage} alt={user?.name} />
                            <AvatarFallback className="bg-primary text-white font-bold">
                              {userInitial}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <p className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}

                    <div className="p-4 flex flex-col gap-8">
                      {/* Unified Navigation links */}
                      <div className="flex flex-col gap-4">
                        <Accordion
                          type="single"
                          collapsible
                          className="flex w-full flex-col gap-4"
                        >
                          {menu.map((item) =>
                            renderMobileMenuItem(item, () => setIsOpen(false)),
                          )}
                        </Accordion>

                        {/* User Specific links (if logged in) */}
                        {user && (
                          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            {(user.role === "EMPLOYER"
                              ? dropdownMenuEmployer
                              : user.role === "ADMIN"
                                ? dropdownMenuAdmin
                                : dropdownMenu
                            ).map((item) => (
                              <NavLink
                                key={item.url}
                                to={item.url}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    "text-md font-bold transition-colors hover:text-primary",
                                    isActive
                                      ? "text-primary"
                                      : "text-slate-900 dark:text-white",
                                  )
                                }
                              >
                                {item.title}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Auth Buttons (if not logged in) */}
                      {!user && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center h-11"
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button
                            asChild
                            className="w-full justify-center h-11"
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action (Logout) */}
                  {user && (
                    <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 h-12 rounded-xl transition-colors"
                        onClick={handleLogout}
                        disabled={isLoading}
                      >
                        <div className="size-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                          <LogOut className="size-4" />
                        </div>
                        <span className="font-bold text-sm">
                          {isLoading ? "Logging out..." : "Log out"}
                        </span>
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-popover text-popover-foreground min-w-[400px]">
          <div className="grid grid-cols-1 gap-1">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavLink
        to={item.url}
        className={({ isActive }) =>
          cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md uppercase px-4 py-2 text-sm font-bold transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-slate-600",
          )
        }
      >
        {item.title}
      </NavLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, onItemClick?: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-sm py-2 font-bold hover:no-underline uppercase text-slate-900 dark:text-white">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-1 pl-2 border-l-2 border-slate-100 dark:border-slate-800 ml-1">
          {item.items.map((subItem) => (
            <NavLink
              key={subItem.title}
              to={subItem.url}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900",
                )
              }
            >
              <div className="shrink-0">{subItem.icon}</div>
              <span className="text-sm">{subItem.title}</span>
            </NavLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <NavLink
      key={item.title}
      to={item.url}
      onClick={onItemClick}
      className={({ isActive }) =>
        cn(
          "text-md font-bold transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-slate-900 dark:text-white",
        )
      }
    >
      {item.title}
    </NavLink>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        cn(
          "group flex w-full items-start gap-4 rounded-lg p-3 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800",
          isActive &&
            "bg-slate-50 dark:bg-slate-900 text-primary border-slate-100 dark:border-slate-800",
        )
      }
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-800">
        {item.icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
            {item.title}
          </p>
          <ChevronRight className="size-4 text-slate-400 opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
        {item.description && (
          <p className="text-xs leading-snug text-slate-500 dark:text-slate-400 line-clamp-1">
            {item.description}
          </p>
        )}
      </div>
    </NavLink>
  );
};

export { Navbar };
