import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApplicantsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
}

export default function ApplicantsPagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
}: ApplicantsPaginationProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
      <p className="text-xs font-medium text-slate-400">
        Showing{" "}
        <span className="font-bold text-slate-700">
          {Math.min((currentPage - 1) * pageSize + 1, totalItems || 0)}–
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{" "}
        of <span className="font-bold text-slate-700">{totalItems}</span>{" "}
        applicants
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="size-8 rounded-lg border border-slate-100 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
          )
          .reduce<(number | "...")[]>((acc, page, idx, arr) => {
            if (idx > 0 && page - (arr[idx - 1] as number) > 1) acc.push("...");
            acc.push(page);
            return acc;
          }, [])
          .map((item, i) =>
            item === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="w-8 text-center text-slate-300 text-sm"
              >
                ···
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item as number)}
                className={`size-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === item
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {item}
              </button>
            ),
          )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="size-8 rounded-lg border border-slate-100 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
