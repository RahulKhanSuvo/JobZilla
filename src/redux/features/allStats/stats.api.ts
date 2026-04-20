import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { CandidateDashboardStats, EmployerStats } from "./stats.type";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobStats: builder.query<IApiResponse<EmployerStats>, void>({
      query: () => "/stats/employer/job-stats",
      providesTags: ["Stats"],
    }),
    getCandidateDashboardStats: builder.query<
      IApiResponse<CandidateDashboardStats>,
      void
    >({
      query: () => "/stats/candidate/dashboard-stats",
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetJobStatsQuery, useGetCandidateDashboardStatsQuery } =
  statsApi;
