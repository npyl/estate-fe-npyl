import { IConversation, IMessageRes } from "@/types/messages";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_MESSAGES_API;
const token = process.env.NEXT_PUBLIC_MESSAGES_TKN; // tenant token

interface IConversationMessagesReq {
    conversationId: string;
    pagination: {
        page: number;
        size: number;
    };
}

interface IConversationMessagesRes {
    messages: IMessageRes[];
    page: number;
    hasMore: boolean;
}

interface IConversationReq {
    tenantId: string;
    recipientId: string;
}
interface IConversationRes {
    id: string;

    // unused:
    // type: "DIRECT";
    // createdAt: "2025-01-08T12:21:57.330Z";
    // updatedAt: "2025-01-08T12:21:57.330Z";
}

export const messages = createApi({
    reducerPath: "messages",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Conversations", "Messages"],
    endpoints: (builder) => ({
        getConversations: builder.query<IConversation[], void>({
            query: () => `conversations`,
            providesTags: ["Conversations"],
        }),
        getConversationMessages: builder.query<
            IConversationMessagesRes,
            IConversationMessagesReq
        >({
            query: (body) => ({
                url: "conversations/load-messages",
                body,
                method: "POST",
            }),

            providesTags: ["Messages"],
        }),
        initiateConversation: builder.mutation<
            IConversationRes,
            IConversationReq
        >({
            query: (body) => ({
                url: `conversations/initiate`,
                body,
                method: "POST",
            }),
            invalidatesTags: ["Conversations"],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationMessagesQuery,
    useInitiateConversationMutation,
} = messages;
