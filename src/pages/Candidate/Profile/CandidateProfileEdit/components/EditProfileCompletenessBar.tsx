import type { FC } from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Check {
  label: string;
  completed: boolean;
}

interface EditProfileCompletenessBarProps {
  checks: Check[];
}

const EditProfileCompletenessBar: FC<EditProfileCompletenessBarProps> = ({
  checks,
}) => {
  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  const color =
    percentage === 100
      ? "bg-emerald-500"
      : percentage >= 60
        ? "bg-primary"
        : "bg-amber-500";

  return (
    <div className="rounded-lg border border-border/50 bg-[#F5F5F5] dark:bg-[#1A1A1A] p-5 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">Profile Completeness</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Fill all sections to maximise recruiter visibility
          </p>
        </div>
        <span
          className={`text-2xl font-extrabold ${percentage === 100 ? "text-emerald-500" : percentage >= 60 ? "text-primary" : "text-amber-500"}`}
        >
          {percentage}%
        </span>
      </div>

      {/* progress bar */}
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* checklist */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
        {checks.map((check) => (
          <li key={check.label} className="flex items-center gap-2 text-sm">
            {check.completed ? (
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="size-4 text-slate-300 dark:text-slate-600 shrink-0" />
            )}
            <span
              className={
                check.completed
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }
            >
              {check.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditProfileCompletenessBar;
