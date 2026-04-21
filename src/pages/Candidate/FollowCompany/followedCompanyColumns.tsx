import type { ColumnDef } from "@/components/common/ReusableTable";
import { MoreHorizontal, MapPin, ExternalLink, UserMinus } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FollowCompanyItem } from "@/redux/features/candidate/Follow.type";

export const followedCompanyColumns = (
  onUnfollow: (id: string) => void,
): ColumnDef<FollowCompanyItem>[] => [
  {
    header: "COMPANY",
    className: "w-[45%]",
    cell: (item) => (
      <div className="flex items-center gap-4">
        {item.following.company.logo ? (
          <img
            src={item.following.company.logo}
            alt={item.following.name}
            className="size-12 rounded-full object-cover border border-slate-100 bg-white"
          />
        ) : (
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {item.following.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="space-y-1">
          <Link
            to={`/company/${item.following.company.id}`}
            className="hover:text-primary transition-colors"
          >
            <h4 className="text-[16px] font-bold text-slate-900 dark:text-slate-50">
              {item.following.name}
            </h4>
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {item.following.company.location}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "INDUSTRY",
    cell: (item) => (
      <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
        {item.following.company.industry}
      </div>
    ),
  },
  {
    header: "OPEN JOBS",
    cell: (item) => (
      <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500">
          {item.following._count.jobs} Jobs
        </span>
      </div>
    ),
  },
  {
    header: "ACTION",
    className: "text-right",
    cell: (item) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="text-slate-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 outline-none"
              title="More Options"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link
                to={`/company/${item.following.company.id}`}
                className="cursor-pointer flex items-center gap-2"
              >
                <ExternalLink className="size-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onUnfollow(item.following.company.id)}
              className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2"
            >
              <UserMinus className="size-4" />
              Unfollow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
