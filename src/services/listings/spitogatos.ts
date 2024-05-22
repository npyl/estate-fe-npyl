import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spitogatosListing = createApi({
    reducerPath: "spitogatosListing",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/integrations/spitogatos`,
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
    tagTypes: [],
    endpoints: (builder) => ({
        addSpitogatosListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `addListing/${propertyId}`,
                method: "POST",
            }),
        }),
        removeSpitogatosListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `removeListing/${propertyId}`,
                method: "DELETE",
            }),
        }),
        syncSpitogatosListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `syncListing/${propertyId}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAddSpitogatosListingMutation,
    useRemoveSpitogatosListingMutation,
    useSyncSpitogatosListingMutation,
} = spitogatosListing;
