import type { FC } from "react";
import ProfileSummary from "./components/ProfileSummary";
import ProfileCompleteness from "./components/ProfileCompleteness";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import PreferencesSection from "./components/PreferencesSection";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
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

  return (
    <div className="space-y-8">
      {/* Profile Header Block */}
      <ProfileSummary data={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sidebar Details */}
        <div className="lg:col-span-4 space-y-8">
          <ProfileCompleteness data={user} />
          <PreferencesSection data={user} />
        </div>

        {/* Right Column: Main Resume Content */}
        <div className="lg:col-span-8 space-y-8">
          <AboutSection data={user} />
          <ExperienceSection workExperiences={user.workExperiences || []} />
          <EducationSection eductions={user.eductions || []} />
        </div>
        <div className="lg:col-span-12">
          <SkillsSection skills={user.skills || []} />
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
