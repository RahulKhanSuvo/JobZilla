import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { Application } from "@/types/application";
import type { CandidateProfile } from "@/types/profile";

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
    getCandidateAppliedJobs: builder.query<IApiResponse<Application[]>, void>({
      query: () => ({
        url: "/applications/candidate/applied",
        method: "GET",
      }),
      providesTags: ["Stats", "Applications", "Jobs"],
    }),
    getCandidateById: builder.query<IApiResponse<CandidateProfile>, string>({
      query: (id) => ({
        url: `/candidate/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUpdataCandidateMutation,
  useGetCandidateAppliedJobsQuery,
  useGetCandidateByIdQuery,
} = candidateApi;
