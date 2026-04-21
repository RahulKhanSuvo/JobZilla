import { Languages } from "lucide-react";
import type { Language } from "@/types/application";
import { Badge } from "@/components/ui/badge";

interface Props {
  languages?: Language[];
}

export default function ApplicantLanguages({ languages }: Props) {
  if (!languages?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
        <Languages className="size-5 text-emerald-500" />
        <h2 className="text-xl font-bold">Languages</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex flex-col gap-1 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm min-w-[120px]"
          >
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {lang.language}
            </span>
            <Badge
              variant="secondary"
              className="w-fit bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-0 text-[10px] font-bold"
            >
              Fluent
            </Badge>
          </div>
        ))}
      </div>
    </section>
  );
}
