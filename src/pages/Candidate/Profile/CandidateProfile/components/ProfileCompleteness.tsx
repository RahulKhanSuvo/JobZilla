import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import type { FC } from "react";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";

interface ProfileCompletenessProps {
  data: CandidateProfileData;
}

const ProfileCompleteness: FC<ProfileCompletenessProps> = ({ data }) => {
  // Define required fields/sections for completeness
  const checks = [
    {
      label: "Basic Details",
      completed: !!(data.fullName && data.email && data.phone && data.location),
    },
    { label: "About Me", completed: !!data.aboutMe },
    { label: "Experience", completed: data.workExperiences?.length > 0 },
    { label: "Education", completed: data.eductions?.length > 0 },
    { label: "Skills", completed: data.skills?.length > 0 },
  ];

  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return (
    <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Profile Completeness
          </CardTitle>
          <span className="text-green-500 font-bold text-lg">
            {percentage}%
          </span>
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
