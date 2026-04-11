import { Menu } from "lucide-react";

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
    },
    {
      title: "Saved Jobs",
      url: "/candidate/saved-jobs",
    },
    {
      title: "Applied Jobs",
      url: "/candidate/applied-jobs",
    },
    {
      title: "Profile",
      url: "/candidate/profile",
    },
  ],
  dropdownMenuEmployer = [
    {
      title: "Dashboard",
      url: "/recruiter",
    },
    {
      title: "Post Job",
      url: "/recruiter/post-job",
    },
    {
      title: "My Jobs",
      url: "/recruiter/my-jobs",
    },
    {
      title: "Profile",
      url: "/recruiter/profile",
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
      className={cn(
        "py-4 bg-white dark:bg-slate-950 shadow-[0_3px_9px_0_rgba(0,0,0,0.05)] ",
        className,
      )}
    >
      <div className="max-w-[1905px] mx-auto  px-10">
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
                    <Button asChild variant="outline">
                      <Link to={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link to={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
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
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} />
          ))}
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
      <AccordionItem key={item.title} value={item.title} className="-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
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
          "flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:text-primary text-slate-600",
          isActive && "text-primary",
        )
      }
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </NavLink>
  );
};

export { Navbar };
