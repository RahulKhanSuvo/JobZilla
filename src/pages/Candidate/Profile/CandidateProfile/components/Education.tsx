import { Timeline, TimelineItem } from "@/components/common/Timeline";
import type { Education } from "@/redux/features/auth/auth.type";

interface EducationProps {
  eductions: Education[];
}

function formatYear(dateStr: string | null | undefined): string {
  if (!dateStr) return "?";
  return new Date(dateStr).getFullYear().toString();
}

export default function Education({ eductions }: EducationProps) {
  if (!eductions || eductions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border-gray-100 mt-4">
      <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        Education
      </h3>

      <Timeline>
        {eductions.map((edu) => {
          const start = formatYear(edu.startData);
          const end = edu.isStudying ? "Present" : formatYear(edu.endData);
          return (
            <TimelineItem
              key={edu.id}
              title={`${edu.major}${edu.field ? ` — ${edu.field}` : ""}`}
              subtitle={edu.institution}
              date={`${start} – ${end}`}
              description={edu.gap ? `Gap: ${edu.gap} year(s)` : undefined}
            />
          );
        })}
      </Timeline>
    </div>
  );
}
