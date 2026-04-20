import type { PostJobFormData } from "@/pages/Recruiter/postjob/postJobSchema";
import baseApi from "../hook/baseApi";
import type {
  IApiResponse,
  IJobQueryParams,
  IJobResponse,
  IRecommendedJob,
  ISavedJob,
} from "@/types/job";
import type { GetJobsResponse, JobStats } from "./job.type";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (payload) => ({
        url: "/jobs",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getAllJobs: builder.query<GetJobsResponse, IJobQueryParams>({
      query: ({
        page = 1,
        limit = 10,
        searchTerm,
        location,
        jobType,
        salary,
        postedAnytime,
        seniorityLevel,
      }) => ({
        url: "/jobs",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          location,
          jobType,
          salary,
          postedAnytime,
          seniorityLevel,
        },
      }),
      providesTags: ["Jobs"],
    }),
    getMyJobs: builder.query<IJobResponse, IJobQueryParams>({
      query: (params) => ({
        url: "/jobs/my-jobs",
        method: "GET",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<IApiResponse<PostJobFormData>, string>({
      query: (jobId: string) => `jobs/public/${jobId}`,
      providesTags: ["Jobs", "SavedJobs"],
    }),
    saveJob: builder.mutation({
      query: (jobId: string) => ({
        url: "jobs/save-job",
        method: "POST",
        body: { jobId },
      }),
      invalidatesTags: ["Jobs", "SavedJobs"],
    }),
    getSaveJob: builder.query<IApiResponse<ISavedJob[]>, IJobQueryParams>({
      query: (params) => ({
        url: "jobs/save-job",
        method: "GET",
        params,
      }),
      providesTags: ["SavedJobs"],
    }),
    unSaveJob: builder.mutation({
      query: (jobId: string) => ({
        url: `jobs/save-job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    getCompanyJobs: builder.query<IApiResponse<PostJobFormData[]>, string>({
      query: (companyId: string) => `jobs/company/${companyId}`,
      providesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (jobId: string) => ({
        url: `jobs/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/jobs/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobStats: builder.query<IApiResponse<JobStats>, void>({
      query: () => "/stats/employer/job-stats",
      providesTags: ["Jobs"],
    }),
    getRecommendedJobs: builder.query<IApiResponse<IRecommendedJob[]>, void>({
      query: () => "/jobs/recommended",
      providesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetMyJobsQuery,
  useGetJobByIdQuery,
  useSaveJobMutation,
  useGetSaveJobQuery,
  useUnSaveJobMutation,
  useGetCompanyJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
  useGetJobStatsQuery,
  useGetRecommendedJobsQuery,
} = jobApi;
