import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

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
    <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-primary rounded-full" />
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-10">
        {workExperiences.length === 0 ? (
          <p className="text-slate-400 italic text-center py-8">
            "No work history recorded yet. Add your professional journey to
            showcase your expertise."
          </p>
        ) : (
          <div className="space-y-10 relative">
            {/* Elegant vertical line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-800" />

            {workExperiences.map((exp) => {
              const startDate = exp.startData
                ? format(new Date(exp.startData), "MMM yyyy")
                : "N/A";
              const endDate = exp.isWorking
                ? "Present"
                : exp.endData
                  ? format(new Date(exp.endData), "MMM yyyy")
                  : "N/A";

              return (
                <div key={exp.id} className="relative pl-14 group">
                  {/* Timeline Node */}
                  <div className="absolute left-4 top-1.5 size-4 rounded-full border-4 border-white dark:border-slate-900 bg-primary shadow-sm z-10 transition-transform group-hover:scale-125 duration-300" />

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                        {exp.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                          {startDate} — {endDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">
                      <span>{exp.companyName}</span>
                      <span className="text-slate-300">•</span>
                      <span>{exp.industry}</span>
                    </div>

                    <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl pt-2 border-l-2 border-slate-50 dark:border-slate-800/50 pl-4 py-1">
                      {exp.Description ? (
                        <div
                          className="prose prose-sm dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: exp.Description }}
                        />
                      ) : (
                        <span className="italic opacity-50">
                          Detailed description of responsibilities and
                          achievements was not provided.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
