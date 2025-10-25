import { getChatToken } from "@/contexts/tokens";
import { IConversation, IMessageRes } from "@/types/messages";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

const baseUrl = process.env.NEXT_PUBLIC_MESSAGES_API;

export interface IConversationMessagesReq {
    conversationId: string;
    pagination: {
        page: number;
        size: number;
        cursor: string | null; // INFO: when cursor is passed, page is ignored
    };
}

export interface IConversationMessagesRes {
    messages: IMessageRes[];
    page: number;
    hasMore: boolean;
}

interface IConversationReq {
    recipientId: string;
    message: string;
}

interface IConversationRes {
    id: string;
}

export const messages = createApi({
    reducerPath: "messages",
    baseQuery: getBaseQueryWithReauth({
        baseUrl,
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
    }),
});

export const {
    useGetConversationsQuery,
    useInitiateConversationMutation,
    // ...
    useGetConversationMessagesQuery,
    useLazyGetConversationMessagesQuery,
} = messages;
