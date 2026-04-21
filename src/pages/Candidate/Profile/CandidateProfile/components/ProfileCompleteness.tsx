import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import type { FC } from "react";
import type { AuthUser } from "@/redux/features/auth/auth.type";
import { calculateProfileCompletion } from "@/utils/profileCompletion";

interface ProfileCompletenessProps {
  data: AuthUser;
}

const ProfileCompleteness: FC<ProfileCompletenessProps> = ({ data }) => {
  const { percentage, checks } = calculateProfileCompletion(data);

  // SVG dimensions for circular progress
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden relative group transition-all hover:shadow-sm">
      <CardHeader className="pb-4 pt-6 text-center">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-wider mb-6">
          Profile Strength
        </CardTitle>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center mb-4">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-slate-100 dark:text-slate-800"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              style={{ strokeDashoffset: offset }}
              strokeLinecap="round"
              fill="transparent"
              className="text-primary transition-all duration-1000 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-black text-primary leading-none">
              {percentage}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              %
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium italic">
            "Increase your profile strength to 100% to rank higher in recruiter
            searches."
          </p>
        </div>

        <ul className="space-y-3.5 px-2">
          {checks.map((check, index) => (
            <li
              key={index}
              className="flex items-center justify-between group/item"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-5 rounded-full flex items-center justify-center transition-colors ${
                    check.completed
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600"
                  }`}
                >
                  {check.completed ? (
                    <CheckCircle2 className="size-3 stroke-[3px]" />
                  ) : (
                    <Circle className="size-3 stroke-[3px]" />
                  )}
                </div>
                <span
                  className={`text-sm font-bold transition-colors ${
                    check.completed
                      ? "text-slate-700 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {check.label}
                </span>
              </div>
              {check.completed && (
                <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">
                  Done
                </span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteness;
