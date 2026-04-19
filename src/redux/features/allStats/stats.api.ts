import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { CandidateDashboardStats } from "./stats.type";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobStats: builder.query({
            query: () => "/stats/employer/job-stats",
        }),
        getCandidateDashboardStats: builder.query<IApiResponse<CandidateDashboardStats>, void>({
            query: () => "/stats/candidate/dashboard-stats",
        }),
    }),
});

export const { useGetJobStatsQuery, useGetCandidateDashboardStatsQuery } = statsApi;