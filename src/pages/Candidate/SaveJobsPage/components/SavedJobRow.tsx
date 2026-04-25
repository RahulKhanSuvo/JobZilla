import { Eye, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location?: string;
  postedAt: string;
  category:
    | "Part-time"
    | "Full-time"
    | "Contract"
    | "On site"
    | "Intern"
    | "Freelance"
    | "Remote";
  datePosted: string;
}

interface SavedJobRowProps {
  job: Job;
  onView: (id: string) => void;
  onRemove: (id: string) => void;
}

const categoryStyles = {
  "Part-time":
    "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  "Full-time":
    "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  Contract: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  "On site":
    "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Intern:
    "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Freelance: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  Remote: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

export default function SavedJobRow({
  job,
  onView,
  onRemove,
}: SavedJobRowProps) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-12 md:items-center py-6 md:py-4 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors px-4 gap-4 md:gap-0 relative">
      {/* Job Info */}
      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
        <div className="size-14 md:size-12 rounded bg-gray-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100 dark:border-slate-700 shadow-sm md:shadow-none">
          {job.logo ? (
            <img
              src={job.logo}
              alt={job.company}
              className="size-full object-cover"
            />
          ) : (
            <div className="text-xl font-bold text-gray-400">
              {job.company[0]}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <h4
            onClick={() => onView(job.id)}
            className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer truncate text-lg md:text-base"
          >
            {job.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="size-3.5" />
              <span className="truncate">{job.company}</span>
            </div>
            <span className="hidden md:inline text-gray-300 dark:text-gray-600">
              •
            </span>
            <span className="font-medium">{job.postedAt}</span>
          </div>
        </div>
      </div>

      {/* Category - and Date - Flex on mobile */}
      <div className="col-span-12 md:col-span-2 flex items-center justify-between md:flex md:justify-center px-1 md:px-0 mt-2 md:mt-0">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider",
            categoryStyles[job.category],
          )}
        >
          {job.category}
        </span>

        {/* Date Posted (Visible only on mobile inside this flex) */}
        <div className="md:hidden text-xs font-medium text-gray-400">
          {job.datePosted}
        </div>
      </div>

      {/* Date Posted (Visible only on Desktop) */}
      <div className="hidden md:block md:col-span-2 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
        {job.datePosted}
      </div>

      {/* Action */}
      <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(job.id)}
          className="h-8 px-2 md:px-3 text-gray-500 hover:text-primary hover:bg-primary/5 transition-all gap-1.5 font-semibold group/view"
          title="View Job"
        >
          <Eye className="size-4 group-hover/view:scale-110 transition-transform" />
          <span className="hidden lg:inline text-xs">View</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(job.id)}
          className="h-8 px-2 md:px-3 text-gray-400 hover:text-destructive hover:bg-destructive/5 transition-all gap-1.5 font-semibold group/remove"
          title="Remove Job"
        >
          <Trash2 className="size-4 group-hover/remove:scale-110 transition-transform" />
          <span className="hidden lg:inline text-xs">Remove</span>
        </Button>
      </div>
    </div>
  );
}
