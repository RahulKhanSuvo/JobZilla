/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPlan } from "@/pages/Admin/plans/planSchema";
import baseApi from "../hook/baseApi";

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
    getAllPlans: builder.query({
      query: () => ({
        url: "/plans/admin/all-plans",
        method: "GET",
      }),
      providesTags: ["plans"],
    }),
    getSinglePlan: builder.query({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "GET",
      }),
    }),
    updatePlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/plans/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "DELETE",
      }),
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
