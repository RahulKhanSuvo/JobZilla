import baseApi from "../hook/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query({
      query: () => "applications",
      providesTags: ["Applications"],
    }),
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
