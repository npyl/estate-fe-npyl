/**
 * NextJS server communication
 * e.g. getting version, up/down status, ...
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVersionRes } from "@/types/server";

export const server = createApi({
    reducerPath: "server",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/server",
    }),

    endpoints: (builder) => ({
        getVersion: builder.query<IVersionRes, void>({
            query: () => "/version",
        }),
    }),
});

export const { useGetVersionQuery } = server;
