import baseApi from "../hook/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (payload) => ({
        url: "/job",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getAllJobs: builder.query({
      query: () => ({
        url: "/job",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useCreateJobMutation, useGetAllJobsQuery } = jobApi;
