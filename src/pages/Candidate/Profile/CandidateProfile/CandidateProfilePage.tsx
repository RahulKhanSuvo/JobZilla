import type { FC } from "react";
import ProfileSummary from "./components/ProfileSummary";
import ProfileCompleteness from "./components/ProfileCompleteness";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";
import ProfileSkeleton from "./components/ProfileSkeleton";
import ProfileErrorState from "./components/ProfileErrorState";
import ProfileEmptyState from "./components/ProfileEmptyState";

const CandidateProfilePage: FC = () => {
  const { data: response, isLoading, isError } = useCurrentUserQuery();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !response?.data) {
    return <ProfileErrorState />;
  }

  const user = response.data;
  const candidate = user.candidate;

  if (!candidate) {
    return <ProfileEmptyState />;
  }

  const profileData: CandidateProfileData = {
    ...candidate,
    fullName: user.name || "",
    email: user.email,
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-3xl font-bold tracking-tight mb-6">My Profile</h1>

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
