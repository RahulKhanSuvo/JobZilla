import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import ResumeCard from "./components/ResumeCard";
import UploadCV from "./components/UploadCV";
import {
  useGetResumesQuery,
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useSetPrimaryResumeMutation,
} from "@/redux/features/candidate/resume.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { errorToast } from "@/utils/errorToast";

export default function MyCV() {
  const { data: resumesResponse, isLoading } = useGetResumesQuery();
  const [createResume, { isLoading: createLoading }] =
    useCreateResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();
  const [setPrimaryResume] = useSetPrimaryResumeMutation();

  const resumes = resumesResponse?.data || [];

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await createResume(formData).unwrap();
      toast.success("Resume uploaded and saved!");
    } catch (error) {
      errorToast(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResume(id).unwrap();
      toast.info("Resume deleted successfully.");
    } catch (error) {
      errorToast(error);
    }
  };

  const handleSetPrimary = async (id: string) => {
    try {
      await setPrimaryResume(id).unwrap();
      toast.success("Primary resume updated!");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardTitle>My CV</DashboardTitle>
      <CommonWrapper className="p-6 bg-white dark:bg-slate-900">
        <div className="space-y-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="size-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading your resumes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="h-full">
                  <ResumeCard
                    resume={resume}
                    onDelete={handleDelete}
                    onSetPrimary={handleSetPrimary}
                  />
                </div>
              ))}
              <div className="h-full">
                <UploadCV onUpload={handleUpload} isUploading={createLoading} />
              </div>
            </div>
          )}
        </div>
      </CommonWrapper>
    </div>
  );
}
