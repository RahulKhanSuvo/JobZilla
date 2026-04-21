import type { FC } from "react";
import { Target, TrendingUp, FolderOpen } from "lucide-react";
import type { CandidateProfile } from "@/redux/features/auth/auth.type";

interface PreferencesSectionProps {
  candidate: CandidateProfile;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

const CAREER_LABELS: Record<string, string> = {
  ENTRY_LEVEL: "Entry Level",
  MID_LEVEL: "Mid Level",
  SENIOR_LEVEL: "Senior Level",
  EXECUTIVE_LEVEL: "Executive Level",
};

const CATEGORY_LABELS: Record<string, string> = {
  TECHNOLOGY: "Technology",
  DESIGN: "Design",
  MARKETING: "Marketing",
  SALES: "Sales",
  FINANCE: "Finance",
  HR: "Human Resources",
  OPERATIONS: "Operations",
  CUSTOMER_SUPPORT: "Customer Support",
  EDUCATION: "Education",
  HEALTHCARE: "Healthcare",
  LEGAL: "Legal",
  OTHER: "Other",
};

const PreferencesSection: FC<PreferencesSectionProps> = ({ candidate }) => {
  const preferences = [
    {
      icon: Target,
      label: "Preferred Job Type",
      value: candidate.preferredJobType
        ? (JOB_TYPE_LABELS[candidate.preferredJobType] ??
          candidate.preferredJobType)
        : null,
      bgColor: "bg-primary/8 dark:bg-primary/15",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      dotColor: "bg-primary",
    },
    {
      icon: TrendingUp,
      label: "Career Level",
      value: candidate.preferredCareerLevel
        ? (CAREER_LABELS[candidate.preferredCareerLevel] ??
          candidate.preferredCareerLevel)
        : null,
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-100 dark:bg-violet-900/40",
      dotColor: "bg-violet-500",
    },
    {
      icon: FolderOpen,
      label: "Preferred Category",
      value: candidate.preferredCategory
        ? (CATEGORY_LABELS[candidate.preferredCategory] ??
          candidate.preferredCategory)
        : null,
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      iconColor: "text-teal-600 dark:text-teal-400",
      iconBg: "bg-teal-100 dark:bg-teal-900/40",
      dotColor: "bg-teal-500",
    },
  ].filter((p) => p.value);

  if (preferences.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-border/30">
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-violet-500 rounded-full inline-block" />
          Job Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {preferences.map((pref) => (
            <div
              key={pref.label}
              className={`flex flex-col gap-3 p-4 rounded-xl ${pref.bgColor} transition-all hover:-translate-y-0.5 hover:shadow-sm`}
            >
              <div
                className={`size-9 rounded-lg ${pref.iconBg} flex items-center justify-center`}
              >
                <pref.icon className={`size-4.5 ${pref.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  {pref.label}
                </p>
                <p className="font-bold text-foreground text-sm">
                  {pref.value}
                </p>
              </div>
              <div
                className={`self-start h-1 w-8 rounded-full ${pref.dotColor}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
