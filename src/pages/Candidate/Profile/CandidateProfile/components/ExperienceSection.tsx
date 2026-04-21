import type { FC } from "react";
import { Briefcase, MapPin, Building2, CalendarRange } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  startData: string | null;
  endData: string | null;
  Description: string | null;
  isWorking: boolean;
}

interface ExperienceSectionProps {
  workExperiences: Experience[];
}

const ExperienceSection: FC<ExperienceSectionProps> = ({
  workExperiences = [],
}) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-border/30">
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full inline-block" />
          Work Experience
        </h2>

        {workExperiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-3">
              <Briefcase className="size-7 text-primary/50" />
            </div>
            <p className="text-muted-foreground font-medium">
              No work experience added yet.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Add your work history to stand out.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {workExperiences.map((exp, index) => {
              const startDate = exp.startData
                ? format(new Date(exp.startData), "MMM yyyy")
                : "N/A";
              const endDate = exp.isWorking
                ? "Present"
                : exp.endData
                  ? format(new Date(exp.endData), "MMM yyyy")
                  : "N/A";

              const isLast = index === workExperiences.length - 1;

              return (
                <div key={exp.id} className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <Briefcase className="size-4 text-primary" />
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 bg-border/60 mt-2 mb-2 min-h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-6 ${isLast ? "" : ""}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-base text-foreground leading-tight">
                          {exp.jobTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Building2 className="size-3.5 text-primary/60" />
                            {exp.companyName}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="size-3.5 text-primary/60" />
                            {exp.industry}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <CalendarRange className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                          {startDate} – {endDate}
                        </span>
                        {exp.isWorking && (
                          <Badge className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 font-bold">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    {exp.Description && (
                      <div
                        className="text-sm text-muted-foreground leading-relaxed prose prose-sm prose-slate dark:prose-invert max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: exp.Description }}
                      />
                    )}
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

export default ExperienceSection;
