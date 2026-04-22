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
        { label: "Personal Info", completed: false },
        { label: "Phone & Location", completed: false },
        { label: "Professional Bio", completed: false },
        { label: "Career Preferences", completed: false },
        { label: "Work Experience", completed: false },
        { label: "Education Details", completed: false },
        { label: "Technical Skills", completed: false },
        { label: "Languages", completed: false },
      ],
    };
  }

  const checks: CompletionCheck[] = [
    {
      label: "Personal Info",
      completed: !!data.name && !!data.email && !!data.candidate?.gender,
    },
    {
      label: "Phone & Location",
      completed: !!data.candidate?.phone && !!data.candidate?.location,
    },
    {
      label: "Professional Bio",
      completed:
        !!data.candidate?.aboutMe && data.candidate.aboutMe.length > 20,
    },
    {
      label: "Career Preferences",
      completed:
        !!data.candidate?.preferredJobType &&
        !!data.candidate?.preferredCareerLevel &&
        !!data.candidate?.preferredCategory,
    },
    {
      label: "Work Experience",
      completed: (data?.workExperiences?.length ?? 0) > 0,
    },
    {
      label: "Education Details",
      completed: (data?.eductions?.length ?? 0) > 0,
    },
    {
      label: "Technical Skills",
      completed: (data?.skills?.length ?? 0) > 0,
    },
    {
      label: "Languages",
      completed: (data?.languages?.length ?? 0) > 0,
    },
    {
      label: "Social Presence",
      completed:
        !!data.candidate?.linkedin ||
        !!data.candidate?.github ||
        !!data.candidate?.facebook ||
        !!data.candidate?.twitter,
    },
  ];

  const completedCount = checks.filter((c) => c.completed).length;
  const percentage = Math.round((completedCount / checks.length) * 100);

  return { percentage, checks };
};
