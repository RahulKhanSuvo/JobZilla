import type { IApiResponse } from "@/types/job";
import type { ChatConversation, ChatMessage } from "@/types/chat";
import basApi from "../hook/baseApi";

export const chatApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<IApiResponse<ChatConversation[]>, void>({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getMessages: builder.query<IApiResponse<ChatMessage[]>, string>({
      query: (conversationId: string) => ({
        url: `/chat/conversations/${conversationId}/messages`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Chat", id }],
    }),
    startConversation: builder.mutation<
      IApiResponse<ChatConversation>,
      { targetUserId: string }
    >({
      query: (data: { targetUserId: string }) => ({
        url: "/chat/conversations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useStartConversationMutation,
} = chatApi;
