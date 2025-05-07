import { IEmailFilters, IEmailReq, IEmailRes } from "@/types/email";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emails = createApi({
    reducerPath: "emails",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/emails",
    }),

    tagTypes: [],

    endpoints: (builder) => ({
        sendEmail: builder.mutation<void, IEmailReq>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body,
            }),
        }),

        filterEmails: builder.mutation<IEmailRes[], IEmailFilters>({
            query: (body) => ({
                url: "/filter",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useSendEmailMutation, useFilterEmailsMutation } = emails;
