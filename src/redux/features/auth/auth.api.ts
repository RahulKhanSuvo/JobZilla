/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../hook/baseApi";
import type { LoginFormData } from "@/pages/auth/authSchema";
import type { LoginSuccessResponse } from "./auth.type";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginSuccessResponse, LoginFormData>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    currentUser: builder.query<LoginSuccessResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    userLogout: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useCurrentUserQuery,
  useUserLogoutMutation,
} = authApi;
