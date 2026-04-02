import DashboardTitle from "@/components/common/DashboardTitle";
import ProfileHader from "./components/ProfileHader";
import CompanyInfo from "./components/CompanyInfo";
import AboutCompany from "./components/AboutCompany";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function RecruiterProfilePage() {
  const user = useSelector(selectCurrentUser);
  const company = user?.company;
  return (
    <div className="space-y-6">
      <DashboardTitle>Recruiter Profile</DashboardTitle>
      <ProfileHader />
      <div className="flex flex-col gap-6">
        <div className="">
          <CompanyInfo company={company} />
        </div>
        <div className="">
          <AboutCompany company={company} />
        </div>
      </div>
    </div>
  );
}
