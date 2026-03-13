import DashboardTitle from "@/components/common/DashboardTitle";
import ProfileHader from "./ProfileHader";
import CompanyInfo from "./CompanyInfo";
import AboutCompany from "./AboutCompany";

export default function RecruiterProfilePage() {
  return (
    <div className="space-y-6">
      <DashboardTitle>Recruiter Profile</DashboardTitle>
      <ProfileHader />
      <div className="flex flex-col gap-6">
        <div className="">
          <CompanyInfo />
        </div>
        <div className="">
          <AboutCompany />
        </div>
      </div>
    </div>
  );
}
