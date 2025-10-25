import { IntegrationSite } from "@/types/integrations";
import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

interface IListingReq {
    propertyId: number;
    site: IntegrationSite;
}

export const generalListing = createApi({
    reducerPath: "generalListing",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/integrations`,
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
        addGeneralListing: builder.mutation<void, IListingReq>({
            query: ({ propertyId, site }) => ({
                url: `addListing/${propertyId}`,
                method: "POST",
                params: {
                    site,
                },
            }),
        }),
        removeGeneralListing: builder.mutation<void, IListingReq>({
            query: ({ propertyId, site }) => ({
                url: `removeListing/${propertyId}`,
                method: "DELETE",
                params: {
                    site,
                },
            }),
        }),
        syncGeneralListing: builder.mutation<void, IListingReq>({
            query: ({ propertyId, site }) => ({
                url: `syncListing/${propertyId}`,
                method: "POST",
                params: {
                    site,
                },
            }),
        }),
    }),
});

export const {
    useAddGeneralListingMutation,
    useRemoveGeneralListingMutation,
    useSyncGeneralListingMutation,
} = generalListing;
