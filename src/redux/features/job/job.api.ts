import baseApi from "../hook/baseApi";
import type { IApiResponse, IJobQueryParams, IJobResponse } from "@/types/job";

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
    getAllJobs: builder.query({
      query: () => ({
        url: "/jobs",
        method: "GET",
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
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery, useGetMyJobsQuery } =
  jobApi;
