import {
    IGetAttachmentReq,
    IThreadAttachmentRes,
    TEmailFilterRes,
    TThreadMessageReq,
    TThreadRes,
} from "@/types/email";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { optimisticMarkThreadRead } from "./optimistic";
import { IEmailFilterReq, IThreadReq, WithId } from "./types";

interface ISendMailReq {
    body: TThreadMessageReq;
}

export const emails = createApi({
    reducerPath: "emails",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/emails",
    }),

    tagTypes: ["Emails", "EmailById", "Attachments", "AttachmentById"],

    endpoints: (builder) => ({
        sendEmail: builder.mutation<void, WithId<ISendMailReq>>({
            query: ({ userId, body }) => ({
                url: `/${userId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Emails", "EmailById"],
        }),

        // ---------------------------------------------------------------------------

        filterEmails: builder.query<TEmailFilterRes, WithId<IEmailFilterReq>>({
            query: ({ userId, body, pageSize, pageToken }) => ({
                url: `/${userId}/filter`,
                method: "POST",
                body,
                params: {
                    pageSize,
                    pageToken,
                },
            }),
            providesTags: ["Emails"],
        }),

        // ---------------------------------------------------------------------------

        getThread: builder.query<TThreadRes, WithId<IThreadReq>>({
            query: ({ userId, threadId }) => `/${userId}/${threadId}`,
            onQueryStarted: optimisticMarkThreadRead,
            providesTags: ["EmailById"],
        }),

        // ---------------------------------------------------------------------------

        getAttachment: builder.query<
            IThreadAttachmentRes,
            WithId<IGetAttachmentReq>
        >({
            query: ({ userId, ...body }) => ({
                url: `/${userId}/attachment`,
                method: "POST",
                body,
            }),
            providesTags: ["AttachmentById"],
        }),
    }),
});

export const {
    useSendEmailMutation,
    // ...
    useFilterEmailsQuery,
    // ...
    useGetThreadQuery,
    // ...
    useGetAttachmentQuery,
} = emails;
