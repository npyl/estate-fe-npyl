import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PUBLIC_SITE_ID = 1;

export const publicListing = createApi({
    reducerPath: "publicListing",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/listings/public`,
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
        addPublicListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `addListing/${propertyId}?publicSiteId=${PUBLIC_SITE_ID}`,
                method: "POST",
            }),
        }),
        removePublicListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `removeListing/${propertyId}?publicSiteId=${PUBLIC_SITE_ID}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useAddPublicListingMutation, useRemovePublicListingMutation } =
    publicListing;
