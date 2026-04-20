import DashboardTitle from "@/components/common/DashboardTitle";
import { toast } from "sonner";
import { useCreateJobMutation } from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import JobForm from "./components/JobForm";
import type { PostJobFormData } from "./postJobSchema";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PostJob() {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: PostJobFormData) => {
    try {
      await createJob(values).unwrap();
      toast.success("Job posted successfully!");
      navigate("/recruiter/jobs");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* back button */}
      <Button variant={"outline"} onClick={() => navigate(-1)} className="">
        <ArrowLeft className="size-4 mr-2" />
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
