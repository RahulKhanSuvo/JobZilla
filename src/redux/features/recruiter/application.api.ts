import type {
  Application,
  ApplicationStatus,
  IApplicationResponse,
} from "@/types/application";
import baseApi from "../hook/baseApi";
import type { IApiResponse } from "@/types/job";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query<
      IApplicationResponse,
      Record<string, unknown> | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              queryParams.append(key, value.toString());
            }
          });
        }
        return {
          url: "applications",
          params: queryParams,
        };
      },
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
    applyJob: builder.mutation<IApiResponse<Application>, FormData>({
      query: (data) => ({
        url: "applications",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Jobs", "Applications", "Stats"],
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useApplyJobMutation,
} = applicationApi;
