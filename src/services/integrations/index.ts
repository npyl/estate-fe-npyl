import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetImagesOrderReq,
    ImagesOrderRes,
    UpdateImagesOrderReq,
} from "./types";
// import { optimisticSetOrderedImages } from "./optimistic";

export const integrations = createApi({
    reducerPath: "integrations",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/integrations`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),

    tagTypes: ["IntegrationOrderedImages"],

    endpoints: (builder) => ({
        getIntegrationOrderedImages: builder.query<
            ImagesOrderRes,
            GetImagesOrderReq
        >({
            query: ({ propertyId, integrationSite }) => ({
                url: `image-order/${propertyId}`,
                params: {
                    integrationSite,
                },
            }),
            providesTags: ["IntegrationOrderedImages"],
        }),

        setIntegrationOrderedImages: builder.mutation<
            void,
            UpdateImagesOrderReq
        >({
            query: ({ integrationSite, propertyId, propertyImages }) => ({
                url: `image-order/${propertyId}`,
                body: propertyImages,
                params: {
                    integrationSite,
                },
                method: "POST",
            }),
            // onQueryStarted: optimisticSetOrderedImages,
            invalidatesTags: ["IntegrationOrderedImages"],
        }),
    }),
});

export const {
    useGetIntegrationOrderedImagesQuery,
    useSetIntegrationOrderedImagesMutation,
} = integrations;
