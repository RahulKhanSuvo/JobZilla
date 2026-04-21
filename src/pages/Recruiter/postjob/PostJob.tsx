import DashboardTitle from "@/components/common/DashboardTitle";
import { toast } from "sonner";
import { useCreateJobMutation } from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import JobForm from "./components/JobForm";
import type { PostJobFormData } from "./postJobSchema";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useProfileGuard } from "@/hooks/useProfileGuard";
import { useEffect } from "react";

export default function PostJob() {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const navigate = useNavigate();
  const { isComplete, isLoading: isGuardLoading } = useProfileGuard();

  useEffect(() => {
    if (!isGuardLoading && !isComplete) {
      toast.error("Please complete your profile first");
      navigate("/recruiter/dashboard");
    }
  }, [isComplete, isGuardLoading, navigate]);

  const handleSubmit = async (values: PostJobFormData) => {
    try {
      await createJob(values).unwrap();
      toast.success("Job posted successfully!");
      navigate("recruiter/my-jobs");
    } catch (error) {
      errorToast(error);
    }
  };

  if (isGuardLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isComplete) return null;

  return (
    <div className="space-y-6 pb-12">
      {/* back button */}
      <Button variant={"link"} onClick={() => navigate(-1)} className="">
        <ArrowLeft className="size-4" />
        Back
      </Button>
      <DashboardTitle>Post A New Job</DashboardTitle>
      <JobForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Post Job"
      />
    </div>
  );
}
