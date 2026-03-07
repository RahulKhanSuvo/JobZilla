import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden p-1 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 shadow-sm"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
          >
            <List className="size-4" />
          </Button>
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          <span className="text-slate-900 dark:text-white mr-1 text-base">
            9
          </span>{" "}
          Result(s) Found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="12">
          <SelectTrigger className="h-10 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl text-xs w-[130px] shadow-sm font-bold text-slate-600 dark:text-slate-400">
            <SelectValue placeholder="12 Per Page" />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <SelectItem value="12">12 Per Page</SelectItem>
            <SelectItem value="24">24 Per Page</SelectItem>
            <SelectItem value="50">50 Per Page</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="default">
          <SelectTrigger className="h-10 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl text-xs w-[150px] shadow-sm font-bold text-slate-600 dark:text-slate-400">
            <SelectValue placeholder="Sort by (Default)" />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <SelectItem value="default">Sort by (Default)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="salary">Highest Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
