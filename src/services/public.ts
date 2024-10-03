import { IPropertyFilter, IPropertyFilterCounters } from "@/types/properties";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
    reducerPath: "public",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/public`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );

            headers.set("Company-Id", "1");
            headers.set("Site-Id", "1");

            return headers;
        },
    }),
    tagTypes: ["FilterCounters"],
    endpoints: (builder) => ({
        getFilterCounters: builder.query<
            IPropertyFilterCounters,
            IPropertyFilter
        >({
            query: (body) => ({
                url: "/filter-counter",
                body,
                method: "POST",
            }),
            providesTags: ["FilterCounters"],
        }),
    }),
});

export const { useGetFilterCountersQuery } = publicApi;
