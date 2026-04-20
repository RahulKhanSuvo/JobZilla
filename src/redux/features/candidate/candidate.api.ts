import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { Application } from "@/types/application";

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
  }),
});

export const { useUpdataCandidateMutation, useGetCandidateAppliedJobsQuery } =
  candidateApi;
