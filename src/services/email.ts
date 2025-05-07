import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IEmail {}
interface IEmailFilters {}

export const emails = createApi({
    reducerPath: "emails",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/emails",
    }),

    tagTypes: [],

    endpoints: (builder) => ({
        filterEmails: builder.mutation<IEmail, IEmailFilters>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useFilterEmailsMutation } = emails;
