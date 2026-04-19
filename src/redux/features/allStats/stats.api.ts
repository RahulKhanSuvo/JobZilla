import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobStats: builder.query({
            query: () => "/stats/employer/job-stats",
        }),
        getCandidateDashboardStats: builder.query<IApiResponse<any>, void>({
            query: () => "/stats/candidate/dashboard-stats",
        }),
    }),
});

export const { useGetJobStatsQuery, useGetCandidateDashboardStatsQuery } = statsApi;