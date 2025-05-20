import { IEmailFilters, IEmailReq, TThreadRes } from "@/types/email";
import { gmail_v1 } from "@googleapis/gmail";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISendMailReq {
    userId: number;
    body: IEmailReq;
}

interface IEmailFilterReq {
    userId: number;
    body: IEmailFilters;

    pageSize: number;
    pageToken?: string; // INFO: tell gmail api to fetch next page
}

interface IThreadReq {
    userId: number;
    threadId: string;
}

type TEmailFilterRes = Omit<gmail_v1.Schema$ListThreadsResponse, "threads"> & {
    threads: TThreadRes[];
};

export const emails = createApi({
    reducerPath: "emails",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/emails",
    }),

    tagTypes: ["Emails", "EmailById"],

    endpoints: (builder) => ({
        getThread: builder.query<TThreadRes, IThreadReq>({
            query: ({ userId, threadId }) => `/${userId}/${threadId}`,
            providesTags: ["EmailById"],
        }),

        sendEmail: builder.mutation<void, ISendMailReq>({
            query: ({ userId, body }) => ({
                url: `/${userId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Emails", "EmailById"],
        }),

        filterEmails: builder.query<TEmailFilterRes, IEmailFilterReq>({
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
    }),
});

export const { useGetThreadQuery, useSendEmailMutation, useFilterEmailsQuery } =
    emails;
