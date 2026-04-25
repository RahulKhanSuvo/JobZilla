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
import { errorToast } from "@/utils/errorToast";
import { Skeleton } from "@/components/ui/skeleton";

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
      <CommonWrapper className="p-6 bg-white dark:bg-slate-900 border-none">
        <div className="space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[200px] p-6 rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-800/20 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2 mt-auto pt-2">
                    <Skeleton className="h-9 w-full rounded" />
                    <Skeleton className="h-9 w-10 rounded" />
                  </div>
                </div>
              ))}
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
