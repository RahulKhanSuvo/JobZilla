import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { FollowCompanyItem } from "./Follow.type";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followACompany: builder.mutation({
      query: ({
        companyId,
      }: {
        companyId: string;
      }) => ({
        url: `/follow-company/follow/${companyId}`,
        method: "POST",
      }),
      invalidatesTags: ["followCompany", "Jobs"],
    }),
    unFollowACompany: builder.mutation({
      query: ({
        companyId,
      }: {
        companyId: string;
      }) => ({
        url: `/follow-company/unfollow/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["followCompany", "Jobs"],
    }),
    getAllFollwedCompany: builder.query<IApiResponse<FollowCompanyItem[]>, void>({
      query: () => ({
        url: `/follow-company`,
        method: "GET",
      }),
      providesTags: ["followCompany"],
    }),
  }),
});

export const {
  useFollowACompanyMutation,
  useUnFollowACompanyMutation,
  useGetAllFollwedCompanyQuery,
} = followApi;
