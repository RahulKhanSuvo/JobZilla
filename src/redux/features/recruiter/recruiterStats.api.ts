import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { IRecruiterDashboardStats } from "@/types/stats";

const recruiterStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruiterDashboardStats: builder.query<
      IApiResponse<IRecruiterDashboardStats>,
      void
    >({
      query: () => "/stats/employer/dashboard-stats",
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetRecruiterDashboardStatsQuery } = recruiterStatsApi;
