import baseApi from "../hook/baseApi";

const saveJobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveJob: builder.mutation({
      query: (jobId: string) => ({
        url: "/save-job",
        method: "POST",
        body: { jobId },
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    unSaveJob: builder.mutation({
      query: (jobId: string) => ({
        url: `/save-job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    getSaveJob: builder.query({
      query: () => ({
        url: "/save-job",
        method: "GET",
      }),
      providesTags: ["SavedJobs"],
    }),
  }),
});

export const { useSaveJobMutation, useUnSaveJobMutation, useGetSaveJobQuery } =
  saveJobApi;
