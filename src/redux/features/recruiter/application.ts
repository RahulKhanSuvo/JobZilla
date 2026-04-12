import baseApi from "../hook/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplications: builder.query({
      query: () => "applications",
    }),
  }),
});

export const { useGetAllApplicationsQuery } = applicationApi;
