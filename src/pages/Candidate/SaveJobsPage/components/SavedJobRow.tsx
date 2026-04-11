import { MoreHorizontal, MapPin, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div className="grid grid-cols-[1fr_150px_200px_80px] items-center py-4 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors px-4">
      {/* Job Info */}
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-gray-50 dark:border-slate-700">
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
        <div className="flex flex-col">
          <h4 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors cursor-pointer">
            {job.title}
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="size-3.5" />
            <span>{job.company}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span>{job.postedAt}</span>
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            categoryStyles[job.category],
          )}
        >
          {job.category}
        </span>
      </div>

      {/* Date Posted */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {job.datePosted}
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onView(job.id)} className="gap-2">
              <Eye className="size-4" />
              <span>View Job</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRemove(job.id)}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              <span>Remove Job</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
