import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";

export interface IResume {
  id: string;
  title: string;
  fileUrl: string;
  isPrimary: boolean;
  isDraft: boolean;
  createdAt: string;
}

const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<IApiResponse<IResume[]>, void>({
      query: () => ({
        url: "candidate/resume",
        method: "GET",
      }),
      providesTags: ["Resumes"],
    }),
    createResume: builder.mutation<IApiResponse<IResume>, FormData>({
      query: (payload) => ({
        url: "candidate/resume",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Resumes"],
    }),
    deleteResume: builder.mutation<IApiResponse<void>, string>({
      query: (id) => ({
        url: `candidate/resume/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resumes"],
    }),
    setPrimaryResume: builder.mutation<IApiResponse<IResume>, string>({
      query: (id) => ({
        url: `candidate/resume/${id}/primary`,
        method: "PATCH",
      }),
      invalidatesTags: ["Resumes"],
    }),
  }),
});

export const {
  useGetResumesQuery,
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useSetPrimaryResumeMutation,
} = resumeApi;
