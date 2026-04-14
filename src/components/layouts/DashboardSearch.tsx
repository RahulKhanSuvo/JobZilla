import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSearch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center w-full max-w-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm group",
        className,
      )}
    >
      {/* Location Select */}
      <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-800 pr-2 mr-2 shrink-0">
        <MapPin className="size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Select>
          <SelectTrigger className="border-none shadow-none focus:ring-0 h-8 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 w-[90px] sm:w-[110px] hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="z-70">
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="dhaka">Dhaka</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Search className="size-4 text-slate-400 shrink-0 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search jobs, companies..."
          className="border-none shadow-none focus-visible:ring-0 h-8 text-xs sm:text-sm bg-transparent p-0 placeholder:text-slate-400"
        />
      </div>

      {/* Shortcut Hint */}
      <div className="hidden lg:flex items-center ml-2 border border-slate-200 dark:border-slate-800 rounded-md px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase whitespace-nowrap">
          Ctrl K
        </span>
      </div>
    </div>
  );
}
