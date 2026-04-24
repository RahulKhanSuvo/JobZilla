/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPlan } from "@/pages/Admin/plans/planSchema";
import baseApi from "../hook/baseApi";
import type { IApiResponse } from "@/types/job";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation<any, IPlan>({
      query: (data) => ({
        url: "/plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),
    getAllPlans: builder.query<IApiResponse<IPlan[]>, void>({
      query: () => ({
        url: "/plans/admin/all-plans",
        method: "GET",
      }),
      providesTags: ["plans"],
    }),
    getSinglePlan: builder.query<IApiResponse<IPlan>, string>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "GET",
      }),
    }),
    updatePlan: builder.mutation<any, { id: string; data: Partial<IPlan> }>({
      query: ({ id, data }) => ({
        url: `/plans/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["plans"],
    }),
    deletePlan: builder.mutation<any, string>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plans"],
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useGetSinglePlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;
