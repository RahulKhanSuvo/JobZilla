import baseApi from "../hook/baseApi";

const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    followACompany: builder.mutation({
      query: ({ userId, companyId }) => ({
        url: `/follow-company/${companyId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["followCompany"],
    }),
    unFollowACompany: builder.mutation({
      query: ({ userId, companyId }) => ({
        url: `/follow-company/${companyId}`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["followCompany"],
    }),
    getAllFollwedCompany: builder.query({
      query: ({ userId }) => ({
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
