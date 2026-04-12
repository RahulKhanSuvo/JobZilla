import type { Application, ApplicationStatus } from "@/types/application";
import baseApi from "../hook/baseApi";
import type { IApiResponse } from "@/types/job";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<IApiResponse<Application[]>, void>({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
    updateApplicationStatus: builder.mutation<
      IApiResponse<Application>,
      { applicationId: string; status: ApplicationStatus }
    >({
      query: ({ applicationId, status }) => ({
        url: `applications/status/${applicationId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = applicationApi;
