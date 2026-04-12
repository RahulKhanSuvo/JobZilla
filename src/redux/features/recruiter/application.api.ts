import type { Application, ApplicationStatus } from "@/types/application";
import baseApi from "../hook/baseApi";
import type { IApiResponse } from "@/types/job";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<IApiResponse<Application[]>, void>({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
    getApplicationById: builder.query<IApiResponse<Application>, string>({
      query: (id) => `applications/${id}`,
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
    applyJob: builder.mutation({
      query: (data: { jobId: string; resumeId: string; file: File }) => ({
        url: "applications",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Jobs", "Applications"],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useApplyJobMutation,
} = applicationApi;
