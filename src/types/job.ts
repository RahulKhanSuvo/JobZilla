export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "FREELANCE"
  | "CONTRACT"
  | "INTERN"
  | "REMOTE";

export type JobStatus = "OPEN" | "CLOSED" | "PUBLISHED";

export interface IJob {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  views: number;
  gender?: string | null;
  salaryType?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  jobType?: JobType | null;
  experience?: string | null;
  careerLevel?: string | null;
  qualification?: string | null;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  applyType?: string | null;
  totalApplications?: number | null;
  status?: JobStatus | null;
}

export interface IJobMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  uniqueJobs: string[];
  stats: {
    totalApplications: number;
    pending: number;
    shortlisted: number;
    hired: number;
    rejected: number;
  };
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
  location?: string;
  jobType?: string;
  salary?: string[];
  postedAnytime?: string;
  seniorityLevel?: string;
  category?: string;
  locationType?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: IJobMeta;
}

export interface ISavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  updatedAt: string;
  job: IJob & {
    user: {
      name: string;
      email: string;
      company: {
        location: string;
        logo: string;
      };
    };
  };
}

export interface IRecommendedJob extends IJob {
  user: {
    name: string;
    email: string;
    company: {
      location: string;
      logo: string;
    };
  };
}
