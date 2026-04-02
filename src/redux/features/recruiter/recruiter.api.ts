import baseApi from "../hook/baseApi";

const recruiterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateRecruiter: builder.mutation({
      query: (payload) => ({
        url: "/recruiter/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdateRecruiterMutation } = recruiterApi;
