import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
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
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold border-b border-border/50 pb-4">
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        {workExperiences.length === 0 ? (
          <p className="text-muted-foreground italic">
            No work experience added yet.
          </p>
        ) : (
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
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
                <div
                  key={exp.id}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Briefcase className="size-4" />
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-md bg-white dark:bg-slate-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h3 className="font-bold text-lg text-foreground">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {startDate} - {endDate}
                      </span>
                    </div>
                    <p className="font-medium text-sm text-foreground mb-3">
                      {exp.companyName} &bull;{" "}
                      <span className="text-muted-foreground font-normal">
                        {exp.industry}
                      </span>
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <div className="prose" dangerouslySetInnerHTML={{ __html: exp.Description || "" }} />
                    </p>
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
