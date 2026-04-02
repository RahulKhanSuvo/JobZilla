import baseApi from "../hook/baseApi";

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
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery } = jobApi;
