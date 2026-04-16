import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaList } from "react-icons/fa";

interface JobHeaderProps {
  layout: "grid" | "list";
  setLayout: (layout: "grid" | "list") => void;
  total: number;
}

export default function JobHeader({
  layout,
  setLayout,
  total,
}: JobHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white dark:bg-slate-900 overflow-hidden p-1 ">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLayout("list")}
            className={cn(
              "size-9 rounded-none  transition-all duration-300",
              layout === "list"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 "
                : "text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500",
            )}
          >
            <FaList />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLayout("grid")}
            className={cn(
              "size-9 rounded-none transition-all duration-300",
              layout === "grid"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 "
                : "text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500",
            )}
          >
            <BiSolidGridAlt />
          </Button>
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          <span className="text-slate-900 dark:text-white mr-1 text-base">
            {total}
          </span>{" "}
          Results Found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="12">
          <SelectTrigger className="h-10 bg-[#F1F1F1] dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-none  w-32.5  font-bold text-slate-600 dark:text-slate-400 shadow-none">
            <SelectValue placeholder="12 Per Page" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
          >
            <SelectItem value="12">12 Per Page</SelectItem>
            <SelectItem value="24">24 Per Page</SelectItem>
            <SelectItem value="50">50 Per Page</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="default">
          <SelectTrigger className="h-10 bg-[#F1F1F1] dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-none rounded-none  w-37.5  font-bold text-slate-600 dark:text-slate-400">
            <SelectValue placeholder="Sort by (Default)" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
          >
            <SelectItem value="default">Sort by (Default)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="salary">Highest Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
