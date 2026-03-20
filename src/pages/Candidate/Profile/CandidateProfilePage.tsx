import InfoHeader from "./InfoHeader";
import DashboardTitle from "@/components/common/DashboardTitle";
import BasicInfo from "./BasicInfo";
import AboutUseMe from "./AboutUseMe";
export default function CandidateProfilePage() {
  return (
    <div className="space-y-6">
      <DashboardTitle>Profile</DashboardTitle>
      <InfoHeader />
      <div className="flex gap-6">
        <BasicInfo />
        <AboutUseMe />
      </div>
    </div>
  );
}
