import DashboardTitle from "@/components/common/DashboardTitle";
import ProfileHader from "./ProfileHader";
import CompanyInfo from "./CompanyInfo";
import AboutCompany from "./AboutCompany";

export default function RecruiterProfilePage() {
  return (
    <div className="space-y-6">
      <DashboardTitle>Recruiter Profile</DashboardTitle>
      <ProfileHader />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-1">
          <CompanyInfo />
        </div>
        <div className="xl:col-span-2">
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
