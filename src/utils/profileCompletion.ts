import type { CandidateProfileData } from "@/redux/features/auth/auth.type";

export interface CompletionCheck {
  label: string;
  completed: boolean;
}

export interface ProfileCompletionResult {
  percentage: number;
  checks: CompletionCheck[];
}

export const calculateProfileCompletion = (
  data: CandidateProfileData,
): ProfileCompletionResult => {
  const checks: CompletionCheck[] = [
    {
      label: "Basic Details",
      completed: !!(data.fullName && data.email && data.phone && data.location),
    },
    { label: "About Me", completed: !!data.aboutMe },
    {
      label: "Experience",
      completed: (data.workExperiences?.length ?? 0) > 0,
    },
    {
      label: "Education",
      completed: (data.eductions?.length ?? 0) > 0,
    },
    {
      label: "Skills",
      completed: (data.skills?.length ?? 0) > 0,
    },
  ];

  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return { percentage, checks };
};
