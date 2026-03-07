import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        className="size-10 border-slate-200 text-slate-400"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <Button
        variant="ghost"
        className="size-10 font-bold bg-emerald-600 text-white hover:bg-emerald-700"
      >
        1
      </Button>

      <Button
        variant="ghost"
        className="size-10 font-bold text-slate-600 hover:bg-slate-100"
      >
        2
      </Button>

      <Button
        variant="ghost"
        className="size-10 font-bold text-slate-600 hover:bg-slate-100"
      >
        3
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="size-10 border-slate-200 text-slate-400"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
