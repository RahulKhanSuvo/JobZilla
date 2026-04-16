/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../hook/baseApi";
import type {
  IApiResponse,
  IJobQueryParams,
  IJobResponse,
  ISavedJob,
} from "@/types/job";
import type { GetJobsResponse } from "./job.type";

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
    getMyJobs: builder.query<IApiResponse<IJobResponse>, IJobQueryParams>({
      query: (params) => ({
        url: "/jobs/my-jobs",
        method: "GET",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (jobId: string) => `jobs/${jobId}`,
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
    getCompanyJobs: builder.query<IApiResponse<any[]>, string>({
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
} = jobApi;
