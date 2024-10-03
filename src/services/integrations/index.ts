import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetImagesOrderReq, UpdateImagesOrderReq } from "./types";
import { ImagesOrderRes } from "@/types/integrations";
// import { optimisticSetOrderedImages } from "./optimistic";

export const integrations = createApi({
    reducerPath: "integrations",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/integrations`,
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
                url: `/`,
                params: {
                    integrationSite,
                    propertyId,
                },
            }),
            providesTags: ["IntegrationOrderedImages"],
        }),

        setIntegrationOrderedImages: builder.mutation<
            void,
            UpdateImagesOrderReq
        >({
            query: ({ integrationSite, propertyId, propertyImages }) => ({
                url: `/`,
                body: propertyImages,
                params: {
                    integrationSite,
                    propertyId,
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
