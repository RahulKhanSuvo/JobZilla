import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { format } from "date-fns";

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
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold border-b border-border/50 pb-4">
          Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        {eductions.length === 0 ? (
          <p className="text-muted-foreground italic">
            No education details added yet.
          </p>
        ) : (
          <div className="space-y-6">
            {eductions.map((edu) => {
              const startDate = edu.startData
                ? format(new Date(edu.startData), "yyyy")
                : "N/A";
              const endDate = edu.isStudying
                ? "Present"
                : edu.endData
                  ? format(new Date(edu.endData), "yyyy")
                  : "N/A";

              return (
                <div
                  key={edu.id}
                  className="group relative flex gap-6 pb-6 last:pb-0"
                >
                  <div className="before:absolute before:left-[19px] before:top-10 before:bottom-0 before:w-px before:bg-border/60 group-last:before:hidden" />

                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground border-2 border-white dark:border-slate-900 shadow-sm shrink-0 relative z-10 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <GraduationCap className="size-5" />
                  </div>

                  <div className="flex-1 space-y-1 pt-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-bold text-foreground text-lg">
                        {edu.major}
                      </h3>
                      <span className="text-sm font-medium text-muted-foreground">
                        {startDate} - {endDate}
                      </span>
                    </div>
                    <p className="font-medium text-muted-foreground">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground/80 pt-1">
                      Field of Study: {edu.field}
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

export default EducationSection;
