import basApi from "../hook/baseApi";

export const chatApi = basApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: (conversationId: string) => ({
        url: `/chat/conversations/${conversationId}/messages`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Chat", id }],
    }),
    startConversation: builder.mutation({
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
