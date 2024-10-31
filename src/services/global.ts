import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGlobal } from "src/types/global";

export const global = createApi({
    reducerPath: "global",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/global`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );
            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );

            return headers;
        },
    }),
    tagTypes: ["Global"],
    endpoints: (builder) => ({
        allGlobals: builder.query<IGlobal, string>({
            query: () => ({
                url: "",
            }),
            providesTags: ["Global"],
        }),
    }),
});

export const { useAllGlobalsQuery, useLazyAllGlobalsQuery } = global;
