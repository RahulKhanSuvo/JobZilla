import DashboardTitle from "@/components/common/DashboardTitle";
import { toast } from "sonner";
import { useCreateJobMutation } from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import JobForm from "./components/JobForm";
import type { PostJobFormData } from "./postJobSchema";

export default function PostJob() {
  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleSubmit = async (values: PostJobFormData) => {
    try {
      await createJob(values).unwrap();
      toast.success("Job posted successfully!");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <DashboardTitle>Post A New Job</DashboardTitle>
      <JobForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Post Job"
      />
    </div>
  );
}
