import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-3 py-10 transition-colors">
      <Button
        variant="ghost"
        size="icon"
        className="size-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500 shadow-sm transition-all"
      >
        <ChevronLeft className="size-5" />
      </Button>

      <Button
        variant="ghost"
        className="size-11 rounded-xl font-black bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all"
      >
        1
      </Button>

      {[2, 3].map((page) => (
        <Button
          key={page}
          variant="ghost"
          className="size-11 rounded-xl font-bold bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-500 shadow-sm transition-all"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="size-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500 shadow-sm transition-all"
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
