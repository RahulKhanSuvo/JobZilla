import DashboardTitle from "@/components/common/DashboardTitle";
import ProfileHader from "./components/ProfileHader";
import CompanyInfo from "./components/CompanyInfo";
import AboutCompany from "./components/AboutCompany";

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
