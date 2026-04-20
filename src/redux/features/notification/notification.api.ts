import type { IApiResponse } from "@/types/job";
import baseApi from "../hook/baseApi";
import type { NotificationItem } from "@/pages/Candidate/Notification/types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      IApiResponse<NotificationItem[]> & { meta: { unreadCount: number } },
      void
    >({
      query: () => "notifications",
      providesTags: ["Notifications"],
    }),
    markAsRead: builder.mutation<IApiResponse<NotificationItem>, string>({
      query: (id) => ({
        url: `notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    markAllAsRead: builder.mutation<IApiResponse<void>, void>({
      query: () => ({
        url: "notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteNotification: builder.mutation<IApiResponse<void>, string>({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
