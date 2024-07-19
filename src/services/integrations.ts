import { IntegrationSite } from "@/types/listings";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ImagesOrderRes {
    image: {
        id: number;
        url: string;
    };
    order: number;
}

interface GetImagesOrderReq {
    propertyId: number;
    integrationSite: IntegrationSite;
}
interface UpdateImagesOrderReq {
    propertyId: number;
    propertyImages: number[]; // ids
}

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
            ImagesOrderRes[],
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
            query: ({ propertyId, propertyImages }) => ({
                url: `image-order/${propertyId}`,
                body: propertyImages,
                method: "POST",
            }),
            invalidatesTags: ["IntegrationOrderedImages"],
        }),
    }),
});

export const {
    useGetIntegrationOrderedImagesQuery,
    useSetIntegrationOrderedImagesMutation,
} = integrations;
