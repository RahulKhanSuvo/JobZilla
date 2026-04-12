import type { Application } from "@/types/application";
import baseApi from "../hook/baseApi";

interface ApplicationsResponse {
  success: boolean;
  message: string;
  data: Application[];
}

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<ApplicationsResponse, void>({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
