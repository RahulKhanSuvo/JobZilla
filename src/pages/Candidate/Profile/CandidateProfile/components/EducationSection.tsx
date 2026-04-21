import type { FC } from "react";
import { GraduationCap, CalendarRange } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Education {
  id: string;
  institution: string;
  major: string;
  field: string;
  startData: string | null;
  endData: string | null;
  isStudying: boolean;
}

interface EducationSectionProps {
  eductions: Education[];
}

const EducationSection: FC<EducationSectionProps> = ({ eductions = [] }) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-border/30">
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full inline-block" />
          Education
        </h2>

        {eductions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-3">
              <GraduationCap className="size-7 text-indigo-400" />
            </div>
            <p className="text-muted-foreground font-medium">
              No education details added yet.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Add your academic background to complete your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {eductions.map((edu, index) => {
              const startDate = edu.startData
                ? format(new Date(edu.startData), "yyyy")
                : "N/A";
              const endDate = edu.isStudying
                ? "Present"
                : edu.endData
                  ? format(new Date(edu.endData), "yyyy")
                  : "N/A";

              const isLast = index === eductions.length - 1;

              return (
                <div key={edu.id} className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-200/50 dark:border-indigo-700/50">
                      <GraduationCap className="size-4 text-indigo-500" />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-border/60 mt-2 mb-2 min-h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-bold text-base text-foreground leading-tight">
                          {edu.major}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">
                          Field of Study: {edu.field}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <CalendarRange className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                          {startDate} – {endDate}
                        </span>
                        {edu.isStudying && (
                          <Badge className="text-[10px] px-2 py-0.5 bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-800 font-bold">
                            Studying
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
