import DashboardTitle from "@/components/common/DashboardTitle";
import { toast } from "sonner";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import JobForm from "./components/JobForm";
import JobFormSkeleton from "./components/JobFormSkeleton";
import type { PostJobFormData } from "./postJobSchema";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: jobData, isLoading: isFetching } = useGetJobByIdQuery(id!);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleSubmit = async (values: PostJobFormData) => {
    try {
      await updateJob({ id, ...values }).unwrap();
      toast.success("Job updated successfully!");
      navigate("/recruiter/my-jobs");
    } catch (error) {
      errorToast(error);
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-6 pb-12">
        <DashboardTitle>Edit Job</DashboardTitle>
        <JobFormSkeleton />
      </div>
    );
  }

  if (!jobData?.data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Job not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <Button
        variant={"link"}
        onClick={() => navigate("/recruiter/my-jobs")}
        className=""
      >
        <ArrowLeft className="size-4 mr-2 stroke-[3px]" />
        Back
      </Button>
      <DashboardTitle>Edit Job</DashboardTitle>
      <JobForm
        initialValues={jobData.data}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        buttonText="Update Job"
      />
    </div>
  );
}
