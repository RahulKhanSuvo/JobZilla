import DashboardTitle from "@/components/common/DashboardTitle";
import { toast } from "sonner";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";
import JobForm from "./components/JobForm";
import type { PostJobFormData } from "./postJobSchema";
import { useParams, useNavigate } from "react-router";

export default function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: jobData, isLoading: isFetching } = useGetJobByIdQuery(id!);
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleSubmit = async (values: PostJobFormData) => {
    console.log(values);
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
      <div className="flex justify-center items-center h-64">
        <p>Loading job data...</p>
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
