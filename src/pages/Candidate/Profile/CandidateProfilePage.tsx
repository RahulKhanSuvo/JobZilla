import InfoHeader from "./InfoHeader";
import DashboardTitle from "@/components/common/DashboardTitle";
import BasicInfo from "./BasicInfo";
import AboutUseMe from "./AboutUseMe";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { Navigate } from "react-router";

export default function CandidateProfilePage() {
  const { data: userData, isLoading } = useCurrentUserQuery();
  console.log("user", userData);

  if (isLoading) return <div>Loading...</div>;

  const candidate = (userData?.data as { candidate?: unknown })?.candidate;
  if (!candidate) {
    return <Navigate to="edit" />;
  }

  return (
    <div className="space-y-6">
      <DashboardTitle>Profile</DashboardTitle>
      <InfoHeader userData={userData} />
      <div className="flex gap-6">
        <BasicInfo userData={userData} />
        <AboutUseMe userData={userData} />
      </div>
    </div>
  );
}
