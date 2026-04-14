import {
  Menu,
  LayoutDashboard,
  Bookmark,
  Send,
  User,
  ChevronRight,
  Settings,
  HelpCircle,
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
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
      title: "Applied Jobs",
      url: "/candidate/applied-jobs",
      icon: <Send className="size-4" />,
    },
    {
      title: "Profile",
      url: "/candidate/profile",
      icon: <User className="size-4" />,
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
      url: "/admin",
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
  const user = useSelector(selectCurrentUser);
  console.log("currentUse", user);

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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link to={logo.url}>
                      <JobzillaLogo />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {!user ? (
                      <>
                        <Button asChild variant="outline">
                          <Link to={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link to={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-4 border-t pt-6 border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 px-1">
                          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {(user.role === "EMPLOYER"
                            ? dropdownMenuEmployer
                            : dropdownMenu
                          ).map((item) => (
                            <Link
                              key={item.url}
                              to={item.url}
                              className="flex items-center gap-3 text-sm font-medium p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                              <div className="size-8 rounded-md bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-slate-500">
                                {item.icon}
                              </div>
                              <span className="text-slate-700 dark:text-slate-200">
                                {item.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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

const renderMobileMenuItem = (item: MenuItem) => {
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
      className={({ isActive }) =>
        cn(
          "text-md font-bold transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-slate-900",
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
