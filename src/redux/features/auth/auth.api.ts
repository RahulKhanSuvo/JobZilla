import baseApi from "../hook/baseApi";
import type { LoginFormData } from "@/pages/auth/authSchema";
import type { LoginSuccessResponse, AuthUser } from "./auth.type";
import { logOut, setCredentials } from "./authSlice";
import type { IApiResponse } from "@/types/job";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginFormData>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    currentUser: builder.query<IApiResponse<AuthUser>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials({ user: result.data.data }));
        } catch (error) {
          console.log(error);
          dispatch(logOut());
        }
      },
    }),

    userLogout: builder.mutation<IApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation<
      IApiResponse<null>,
      { currentPassword: string; newPassword: string }
    >({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<IApiResponse<null>, void>({
      query: () => ({
        url: "/auth/delete-account",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useCurrentUserQuery,
  useUserLogoutMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = authApi;
