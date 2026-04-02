/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timeline, TimelineItem } from "@/components/common/Timeline";

interface WorkExperienceProps {
  workExperiences: any[];
}

function formatYear(dateStr: string | null | undefined): string {
  if (!dateStr) return "?";
  return new Date(dateStr).getFullYear().toString();
}

export default function WorkExperience({
  workExperiences,
}: WorkExperienceProps) {
  if (!workExperiences || workExperiences.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border-gray-100 mt-4">
      <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        Work Experience
      </h3>
      <Timeline>
        {workExperiences.map((exp) => {
          const start = formatYear(exp.startData);
          const end = exp.isWorking ? "Present" : formatYear(exp.endData);
          return (
            <TimelineItem
              key={exp.id}
              title={exp.jobTitle}
              subtitle={`${exp.companyName}${exp.industry ? ` · ${exp.industry}` : ""}`}
              date={`${start} – ${end}`}
              description={exp.Description || undefined}
            />
          );
        })}
      </Timeline>
    </div>
  );
}
