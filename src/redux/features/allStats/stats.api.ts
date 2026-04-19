import baseApi from "../hook/baseApi";

const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getJobStats: builder.query({
            query: () => "/stats/employer/job-stats",
        }),
        getCandidateDashboardStats: builder.query({
            query: () => "/stats/candidate/dashboard-stats",
        }),
    }),
});

export const { useGetJobStatsQuery, useGetCandidateDashboardStatsQuery } = statsApi;