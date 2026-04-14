import { useParams, useNavigate } from "react-router";
import { useGetApplicationByIdQuery } from "@/redux/features/recruiter/application.api";
import DashboardTitle from "@/components/common/DashboardTitle";
import ApplicantHeader from "./components/ApplicantHeader";
import ApplicantContent from "./components/ApplicantContent";
import ApplicantSidebar from "./components/ApplicantSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ApplicantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetApplicationByIdQuery(id!, { skip: !id });

  const application = response?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 text-slate-400 text-sm">
        Loading applicant details...
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-slate-400 text-sm">Applicant not found.</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Back navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="size-10 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <DashboardTitle>Applicant Detail</DashboardTitle>
      </div>

      {/* Header Card */}
      <ApplicantHeader application={application} />

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left — tabbed content */}
        <ApplicantContent application={application} />

        {/* Right — sidebar */}
        <ApplicantSidebar application={application} />
      </div>
    </div>
  );
}
