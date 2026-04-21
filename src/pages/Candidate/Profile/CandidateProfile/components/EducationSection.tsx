import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-primary rounded-full" />
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-10">
        {eductions.length === 0 ? (
          <p className="text-slate-400 italic text-center py-8">
            "Educational background not added yet. Share your academic
            achievements to complete your professional profile."
          </p>
        ) : (
          <div className="space-y-10 relative">
            {/* Elegant vertical line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-800" />

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
                <div key={edu.id} className="relative pl-14 group">
                  {/* Timeline Node */}
                  <div className="absolute left-4 top-1.5 size-4 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 shadow-sm z-10 transition-all group-hover:bg-primary group-hover:scale-125 duration-300" />

                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="font-black text-xl text-slate-800 dark:text-white uppercase italic tracking-tight group-hover:text-primary transition-colors">
                        {edu.major}
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-800 px-3 py-1 rounded-full">
                        {startDate} — {endDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px]">
                      <span>{edu.institution}</span>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium pt-1">
                      Field of Study:{" "}
                      <span className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-tighter">
                        {edu.field}
                      </span>
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
