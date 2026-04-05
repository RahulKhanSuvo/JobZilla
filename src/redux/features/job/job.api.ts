import baseApi from "../hook/baseApi";
import type { IApiResponse, IJobQueryParams, IJobResponse } from "@/types/job";
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
      query: ({ page = 1, limit = 10 }) => ({
        url: "/jobs",
        method: "GET",
        params: { page, limit },
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
    }),
    saveJob: builder.mutation({
      query: (jobId: string) => ({
        url: "jobs/save-job",
        method: "POST",
        body: { jobId },
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
} = jobApi;
