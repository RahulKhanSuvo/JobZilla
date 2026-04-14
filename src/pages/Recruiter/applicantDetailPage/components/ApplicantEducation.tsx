import type { Education } from "@/types/application";
import { GraduationCap } from "lucide-react";

interface Props {
  educations?: Education[];
}

function formatYear(dateStr: string) {
  return new Date(dateStr).getFullYear();
}

export default function ApplicantEducation({ educations }: Props) {
  if (!educations?.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Education</h2>
      <div className="space-y-5">
        {educations.map((edu) => (
          <div key={edu.id} className="flex gap-4">
            <div className="shrink-0 size-10 rounded bg-emerald-50 flex items-center justify-center mt-0.5">
              <GraduationCap className="size-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-slate-700">
                  {edu.institution}
                </span>
                <span className="text-xs text-slate-400">
                  {formatYear(edu.startData)} –{" "}
                  {edu.isStudying
                    ? "Present"
                    : edu.endData
                      ? formatYear(edu.endData)
                      : ""}
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-600">
                {edu.major}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{edu.field}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
