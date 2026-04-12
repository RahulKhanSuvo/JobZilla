import baseApi from "../hook/baseApi";

const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updataCandidate: builder.mutation({
      query: (payload) => ({
        url: "/candidate/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getCandidateAppliedJobs: builder.query({
      query: () => ({
        url: "/applications/candidate/applied",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUpdataCandidateMutation, useGetCandidateAppliedJobsQuery } =
  candidateApi;
