import { IConversation } from "@/types/messages";
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

type TMessageType = "TEXT";

interface IMessageRes {
    id: string;
    sender: number; // userId
    type: TMessageType;
    content: string;
    createdAt: string;
}

interface IConversationMessagesRes {
    messages: IMessageRes[];
    page: number;
    hasMore: boolean;
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
    tagTypes: ["Conversation"],
    endpoints: (builder) => ({
        getConversations: builder.query<IConversation[], void>({
            query: () => `conversations`,
            providesTags: ["Conversation"],
        }),
        getConversationMessages: builder.query<
            IConversationMessagesRes,
            IConversationMessagesReq
        >({
            query: (body) => ({
                url: "conversations/load-messages",
                body,
            }),
            providesTags: ["Conversation"],
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationMessagesQuery } =
    messages;
