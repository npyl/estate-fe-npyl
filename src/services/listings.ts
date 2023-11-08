import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listings = createApi({
    reducerPath: "listings",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/listings`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),

    endpoints: (builder) => ({
        addPublicListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `/public/addListing/${propertyId}`,
                method: "POST",
            }),
        }),
        removePublicListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `/public/removeListing/${propertyId}`,
                method: "DELETE",
            }),
        }),

        addSpitogatosListing: builder.mutation<void, number>({
            query: (propertyId: number) => ({
                url: `/spitogatos/addListing/${propertyId}`,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useAddPublicListingMutation,
    useRemovePublicListingMutation,

    useAddSpitogatosListingMutation,
} = listings;
