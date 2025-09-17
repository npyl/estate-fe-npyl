import { getAccessToken } from "@/contexts/accessToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AddOrRemoveFromPublicSiteReq {
    propertyId: number;
    siteId: number;
}

export const publicListing = createApi({
    reducerPath: "publicListing",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/listings/public`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set("Authorization", `Bearer  ${getAccessToken()}`);

            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );

            return headers;
        },
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        addPublicListing: builder.mutation<void, AddOrRemoveFromPublicSiteReq>({
            query: ({ propertyId, siteId }) => ({
                url: `addListing/${propertyId}?publicSiteId=${siteId}`,
                method: "POST",
            }),
        }),
        removePublicListing: builder.mutation<
            void,
            AddOrRemoveFromPublicSiteReq
        >({
            query: ({ propertyId, siteId }) => ({
                url: `removeListing/${propertyId}?publicSiteId=${siteId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useAddPublicListingMutation, useRemovePublicListingMutation } =
    publicListing;
