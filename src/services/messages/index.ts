import { IConversation, IMessageRes, TMessageType } from "@/types/messages";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_MESSAGES_API;

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

interface IConversationMessageReq {
    conversationId: string;
    type: TMessageType;
    content: string;
}

export const messages = createApi({
    reducerPath: "messages",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("chatToken")}`
            );
            return headers;
        },
    }),
    tagTypes: ["Conversations", "Messages"],
    endpoints: (builder) => ({
        getConversations: builder.query<IConversation[], void>({
            query: () => `conversations`,
            providesTags: ["Conversations"],
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

        //---------------------------------------
        //              Messages
        //---------------------------------------

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
        sendMessageToConversation: builder.mutation<
            void,
            IConversationMessageReq
        >({
            query: (body) => ({
                url: `conversations/send-message`,
                body,
                method: "POST",
            }),
            invalidatesTags: ["Messages"],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useInitiateConversationMutation,
    // ...
    useGetConversationMessagesQuery,
    useSendMessageToConversationMutation,
} = messages;
