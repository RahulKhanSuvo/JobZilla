import baseApi from "../hook/baseApi";

const recruiterStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruiterDashboardStats: builder.query({
      query: () => "/stats/employer/dashboard-stats",
    }),
  }),
});

export const { useGetRecruiterDashboardStatsQuery } = recruiterStatsApi;
