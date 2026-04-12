import type { Application } from "@/types/application";
import type { ColumnDef } from "@/components/common/ReusableTable";
import { MapPin, Building2, Eye } from "lucide-react";
import { Link } from "react-router";

export const appliedJobColumns: ColumnDef<Application>[] = [
  {
    header: "JOBS",
    className: "w-[45%]", // Make jobs column wider
    cell: (item) => (
      <div className="flex items-center gap-4">
        {item.job?.company?.logo ? (
          <img
            src={item.job.company.logo}
            alt={item.job?.company?.user?.name}
            className="size-12 rounded-full object-cover border border-slate-100 bg-white"
          />
        ) : (
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {item.job?.company?.user?.name?.charAt(0)?.toUpperCase() || "C"}
          </div>
        )}
        <div className="space-y-1">
          <Link
            to={`/jobs/${item.jobId}`}
            className="hover:text-primary transition-colors"
          >
            <h4 className="text-[16px] font-bold text-slate-900 dark:text-slate-50">
              {item.job?.title || "N/A"}
            </h4>
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              {item.job?.company?.location || "Remote"}
            </span>
            <span className="flex items-center gap-1">
              <Building2 className="size-3.5" />
              {item.job?.company?.user?.name || "N/A"}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "STATUS",
    cell: (item) => {
      const statusMap: Record<string, string> = {
        PENDING:
          "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500",
        ACCEPTED:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500",
        REJECTED: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500",
        SHORTLISTED:
          "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500",
      };

      const badgeClass =
        statusMap[item.status] ||
        "bg-slate-50 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400";

      return (
        <span
          className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${badgeClass}`}
        >
          {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    header: "DATE APPLIED",
    cell: (item) => {
      const date = new Date(item.createdAt);
      return (
        <div className="text-slate-600 dark:text-slate-400 font-medium text-sm">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    header: "ACTION",
    className: "text-right",
    cell: (item) => (
      <div className="flex justify-end">
        <Link to={`/jobs/${item.jobId}`}>
          <button
            type="button"
            className="text-slate-400 cursor-pointer hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800"
            title="View Details"
          >
            <Eye className="size-5" />
          </button>
        </Link>
      </div>
    ),
  },
];
