import baseApi from "../hook/baseApi";

const candidateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updataCandidate: builder.mutation({
      query: (payload) => ({
        url: "/candidate",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useUpdataCandidateMutation } = candidateApi;
