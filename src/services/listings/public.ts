import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

interface AddOrRemoveFromPublicSiteReq {
    propertyId: number;
    siteId: number;
}

export const publicListing = createApi({
    reducerPath: "publicListing",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/listings/public`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

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
