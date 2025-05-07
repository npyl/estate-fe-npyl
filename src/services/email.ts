import { IEmailFilters, IEmailReq, IEmailRes } from "@/types/email";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ISendMailReq {
    userId: number;
    body: IEmailReq;
}

interface IEmailFiltersReq {
    userId: number;
    body: IEmailFilters;
}

export const emails = createApi({
    reducerPath: "emails",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/emails",
    }),

    tagTypes: ["Emails"],

    endpoints: (builder) => ({
        sendEmail: builder.mutation<void, ISendMailReq>({
            query: ({ userId, body }) => ({
                url: `/${userId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Emails"],
        }),

        filterEmails: builder.query<IEmailRes[], IEmailFiltersReq>({
            query: ({ userId, body }) => ({
                url: `/${userId}/filter`,
                method: "POST",
                body,
            }),
            providesTags: ["Emails"],
        }),
    }),
});

export const { useSendEmailMutation, useFilterEmailsQuery } = emails;
