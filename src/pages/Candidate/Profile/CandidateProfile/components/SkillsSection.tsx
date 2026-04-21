import type { FC } from "react";
import { Star, Zap } from "lucide-react";

interface Skill {
  id: string;
  skill: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

// Cycle through accent colors for visual variety
const COLORS = [
  "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white hover:border-primary",
  "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-700",
  "bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-600 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-700",
  "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700",
  "bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-600 hover:text-white hover:border-teal-600 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-700",
];

const SkillsSection: FC<SkillsSectionProps> = ({ skills = [] }) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-border/30">
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-amber-500 rounded-full inline-block" />
          Skills
        </h2>

        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="size-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3">
              <Star className="size-7 text-amber-400" />
            </div>
            <p className="text-muted-foreground font-medium">
              No skills added yet.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Add skills to show recruiters what you can do.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s, index) => (
              <span
                key={s.id}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border cursor-default transition-all duration-200 select-none ${COLORS[index % COLORS.length]}`}
              >
                <Zap className="size-3" />
                {s.skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
