import { createApi } from "@reduxjs/toolkit/query/react";
import { GetImagesOrderReq, UpdateImagesOrderReq } from "./types";
import { ImagesOrderRes } from "@/types/integrations";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

export const integrations = createApi({
    reducerPath: "integrations",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `/api/integrations`,
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
