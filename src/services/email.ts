import {
    IEmailFilters,
    IGetAttachmentReq,
    IGetAttachmentsReq,
    TEmailFilterRes,
    TThreadMessageReq,
    TThreadRes,
} from "@/types/email";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type WithId<T> = T & { userId: number };

interface ISendMailReq {
    body: TThreadMessageReq;
}

interface IEmailFilterReq {
    body: IEmailFilters;

    pageSize: number;
    pageToken?: string; // INFO: tell gmail api to fetch next page
}

interface IThreadReq {
    threadId: string;
}

interface IAttachmentData {
    base64: string;
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
            providesTags: ["EmailById"],
        }),

        // ---------------------------------------------------------------------------

        getAttachment: builder.query<
            IAttachmentData,
            WithId<IGetAttachmentReq>
        >({
            query: ({ userId, ...body }) => ({
                url: `/${userId}/attachment`,
                method: "POST",
                body,
            }),
            providesTags: ["AttachmentById"],
        }),

        getAttachments: builder.query<
            IAttachmentData[],
            WithId<IGetAttachmentsReq>
        >({
            query: ({ userId, ...body }) => ({
                url: `/${userId}/attachments`,
                method: "POST",
                body,
            }),
            providesTags: ["Attachments"],
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
    useGetAttachmentsQuery,
} = emails;
