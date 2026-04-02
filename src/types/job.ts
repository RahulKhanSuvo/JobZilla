export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "FREELANCE"
  | "CONTRACT"
  | "INTERN"
  | "REMOTE";

export interface IJob {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  gender?: string | null;
  externalUrl?: string | null;
  applyEmail?: string | null;
  salaryType?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  jobType?: JobType | null;
  experience?: string | null;
  careerLevel?: string | null;
  qualification?: string | null;
  deadline?: string | null;
  skills?: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  applyType?: string | null;
}

export interface IJobMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IJobResponse {
  meta: IJobMeta;
  data: IJob[];
}

export interface IJobQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
