import type { AuthUser } from "@/redux/features/auth/auth.type";

export interface CompletionCheck {
  label: string;
  completed: boolean;
}

export interface ProfileCompletionResult {
  percentage: number;
  checks: CompletionCheck[];
}

export const calculateProfileCompletion = (
  data: AuthUser | undefined | null,
): ProfileCompletionResult => {
  if (!data) {
    return {
      percentage: 0,
      checks: [
        { label: "Full Name", completed: false },
        { label: "Email", completed: false },
        { label: "Phone", completed: false },
        { label: "Location", completed: false },
        { label: "About Me", completed: false },
        { label: "Experience", completed: false },
        { label: "Education", completed: false },
        { label: "Skills", completed: false },
      ],
    };
  }

  const checks: CompletionCheck[] = [
    { label: "Full Name", completed: !!data.name },
    { label: "Email", completed: !!data.email },
    { label: "Phone", completed: !!data.candidate?.phone },
    { label: "Location", completed: !!data.candidate?.location },
    { label: "About Me", completed: !!data.candidate?.aboutMe },
    {
      label: "Experience",
      completed: (data?.workExperiences?.length ?? 0) > 0,
    },
    {
      label: "Education",
      completed: (data?.eductions?.length ?? 0) > 0,
    },
    {
      label: "Skills",
      completed: (data?.skills?.length ?? 0) > 0,
    },
  ];

  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return { percentage, checks };
};
