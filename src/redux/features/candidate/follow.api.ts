import baseApi from "../hook/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followACompany: builder.mutation({
      query: ({
        companyId,
      }: {
        companyId: string;
      }) => ({
        url: `/follow-company/${companyId}`,
        method: "POST",
      }),
      invalidatesTags: ["followCompany"],
    }),
    unFollowACompany: builder.mutation({
      query: ({
        companyId,
      }: {
        companyId: string;
      }) => ({
        url: `/follow-company/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["followCompany"],
    }),
    getAllFollwedCompany: builder.query({
      query: ({ userId }: { userId: string }) => ({
        url: `/follow-company/${userId}`,
        method: "GET",
      }),
      providesTags: ["followCompany"],
    }),
  }),
});

export const {
  useFollowACompanyMutation,
  useUnFollowACompanyMutation,
  useGetAllFollwedCompanyQuery,
} = followApi;
