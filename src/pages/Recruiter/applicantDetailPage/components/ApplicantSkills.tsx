import type { Skill } from "@/types/application";
import { Wrench } from "lucide-react";

interface Props {
  skills?: Skill[];
}

export default function ApplicantSkills({ skills }: Props) {
  if (!skills?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
        <Wrench className="size-5 text-emerald-500" />
        <h2 className="text-xl font-bold">Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.id}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-100 dark:border-slate-700/50 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
          >
            {s.skill}
          </span>
        ))}
      </div>
    </section>
  );
}
