import type { WorkExperience } from "@/types/application";
import { Briefcase } from "lucide-react";

interface Props {
  experiences?: WorkExperience[];
}

function formatYear(dateStr: string) {
  return new Date(dateStr).getFullYear();
}

export default function ApplicantExperience({ experiences }: Props) {
  if (!experiences?.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
        <Briefcase className="size-5 text-emerald-500" />
        <h2 className="text-xl font-bold">Work Experience</h2>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100 dark:before:bg-slate-800">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-1.5 size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-sm group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30 transition-colors">
              <Briefcase className="size-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {exp.jobTitle}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                  {formatYear(exp.startData)} —{" "}
                  {exp.isWorking
                    ? "Present"
                    : exp.endData
                      ? formatYear(exp.endData)
                      : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                  {exp.companyName}
                </p>
                <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {exp.industry}
                </p>
              </div>

              <div
                className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed prose prose-slate dark:prose-invert max-w-none pt-1"
                dangerouslySetInnerHTML={{ __html: exp.Description }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
