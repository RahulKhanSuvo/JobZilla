import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";

export interface GetJobsResponse {
  success: boolean;
  message: string;
  data: PostJobFormData[];
}
