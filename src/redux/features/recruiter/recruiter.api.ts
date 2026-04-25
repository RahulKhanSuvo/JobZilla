import type { IApiResponse } from "@/types/job";
import type { CompanyProfile } from "@/types/profile";
import baseApi from "../hook/baseApi";

const recruiterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateRecruiter: builder.mutation({
      query: (payload) => ({
        url: "/recruiter/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getCompanyById: builder.query<IApiResponse<CompanyProfile>, string>({
      query: (id: string) => ({
        url: `/recruiter/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUpdateRecruiterMutation, useGetCompanyByIdQuery } =
  recruiterApi;
