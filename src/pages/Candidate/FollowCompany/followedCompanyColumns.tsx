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


export const followedCompanyColumns: ColumnDef<FollowCompanyItem>[] = [
  {
    header: "COMPANY",
    className: "w-[45%]",
    cell: (item) => (
      <div className="flex items-center gap-4">
        {item.company.logo ? (
          <img
            src={item.company.logo}
            alt={item.company.user.name}
            className="size-12 rounded-full object-cover border border-slate-100 bg-white"
          />
        ) : (
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {item.company.user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="space-y-1">
          <Link
            to={`/company/${item.id}`}
            className="hover:text-primary transition-colors"
          >
            <h4 className="text-[16px] font-bold text-slate-900 dark:text-slate-50">
              {item.company.user.name}
            </h4>
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {item.company.location}
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
        {item.company.industry}
      </div>
    ),
  },
  {
    header: "OPEN JOBS",
    cell: (item) => (
      <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500">
          {item.company._count.applications} Jobs
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
                to={`/company/${item.id}`}
                className="cursor-pointer flex items-center gap-2"
              >
                <ExternalLink className="size-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { }} className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2">
              <UserMinus className="size-4" />
              Unfollow
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
