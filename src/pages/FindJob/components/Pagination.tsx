import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 transition-colors">
      {/* Prev */}
      <Button
        variant="ghost"
        size="icon"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="size-11 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500 shadow-sm transition-all disabled:opacity-50"
      >
        <ChevronLeft className="size-5" />
      </Button>

      {/* Pages */}
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant="ghost"
          onClick={() => onPageChange(p)}
          className={`size-11 rounded font-bold shadow-sm transition-all ${
            page === p
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600"
          }`}
        >
          {p}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="ghost"
        size="icon"
        disabled={page === totalPage}
        onClick={() => onPageChange(page + 1)}
        className="size-11 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-500 shadow-sm transition-all disabled:opacity-50"
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
