import type { Application } from "@/types/application";
import baseApi from "../hook/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<Application[], void>({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
