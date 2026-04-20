/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../hook/baseApi";
import type { LoginFormData } from "@/pages/auth/authSchema";
import type { LoginSuccessResponse, CurrentUserResponse } from "./auth.type";
import { logOut, setCredentials } from "./authSlice";

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
    currentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data));
        } catch (error) {
          console.log(error);
          dispatch(logOut());
        }
      },
    }),

    userLogout: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useCurrentUserQuery,
  useUserLogoutMutation,
  useChangePasswordMutation,
} = authApi;
