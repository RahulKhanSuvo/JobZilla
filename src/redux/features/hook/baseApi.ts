import type { RootState } from "@/redux/store";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../auth/authSlice";
interface RefreshResponse {
  accessToken: string;
  success: boolean;
}
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      const data = refreshResult.data as RefreshResponse;
      api.dispatch(setCredentials({ token: data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Jobs",
    "SavedJobs",
    "Resumes",
    "Applications",
    "followCompany",
    "Chat",
    "Notifications",
    "Stats",
  ],
});
export default baseApi;
