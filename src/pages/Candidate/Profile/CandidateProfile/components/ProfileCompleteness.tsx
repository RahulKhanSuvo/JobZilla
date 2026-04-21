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

  return (
    <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-linear-to-r from-green-400 to-green-600 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <CardHeader className="pb-2 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Profile Completeness
          </CardTitle>
          <div className="flex items-baseline gap-0.5">
            <span className="text-green-500 font-bold text-xl">
              {percentage}
            </span>
            <span className="text-green-500/70 text-sm font-bold">%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete your profile to unlock full features and get noticed by top
          employers.
        </p>

        <ul className="space-y-3">
          {checks.map((check, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              {check.completed ? (
                <CheckCircle2 className="size-4 text-green-500 shrink-0" />
              ) : (
                <Circle className="size-4 text-slate-300 dark:text-slate-700 shrink-0" />
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
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteness;
