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
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Experience</h2>
      <div className="space-y-5">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex gap-4">
            <div className="shrink-0 size-10 rounded bg-blue-50 flex items-center justify-center mt-0.5">
              <Briefcase className="size-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-slate-700">
                  {exp.companyName}
                </span>
                <span className="text-xs text-slate-400">
                  {formatYear(exp.startData)} –{" "}
                  {exp.isWorking
                    ? "Present"
                    : exp.endData
                      ? formatYear(exp.endData)
                      : ""}
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600">
                {exp.jobTitle}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{exp.industry}</p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {exp.Description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
