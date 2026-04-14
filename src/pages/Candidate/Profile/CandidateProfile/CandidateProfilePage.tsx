import type { FC } from "react";
import ProfileSummary from "./components/ProfileSummary";
import ProfileCompleteness from "./components/ProfileCompleteness";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { Skeleton } from "@/components/ui/skeleton";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";

const CandidateProfilePage: FC = () => {
  const { data: response, isLoading, isError } = useCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-pulse text-transparent select-none pointer-events-none">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 lg:col-span-1">
            <Skeleton className="h-[450px] w-full rounded-2xl" />
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-[250px] w-full rounded-2xl" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
            <Skeleton className="h-[350px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
        <div className="size-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Failed to load profile
        </h2>
        <p className="text-muted-foreground max-w-md">
          Something went wrong while fetching your profile information. Please
          try refreshing the page or try again later.
        </p>
      </div>
    );
  }

  const user = response.data;
  const candidate = user.candidate;

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
        <h2 className="text-2xl font-bold mb-2 text-foreground">
          Complete Your Candidate Profile
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          It looks like you haven't set up your candidate profile yet. Start by
          adding your details to attract recruiters.
        </p>
        <button className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
          Build Profile
        </button>
      </div>
    );
  }

  const profileData: CandidateProfileData = {
    ...candidate,
    fullName: user.name || "",
    email: user.email,
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <ProfileSummary data={profileData} />
          <ProfileCompleteness data={profileData} />
        </div>

        {/* Main Content Area */}
        <div className="space-y-6 lg:col-span-2">
          <AboutSection data={profileData} />
          <ExperienceSection
            workExperiences={candidate.workExperiences || []}
          />
          <EducationSection eductions={candidate.eductions || []} />
          <SkillsSection skills={candidate.skills || []} />
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
