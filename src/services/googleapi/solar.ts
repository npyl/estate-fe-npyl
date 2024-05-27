import { BuildingInsights } from "@/pages/property/[propertyId]/(tabs)/Green/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const solar = createApi({
    reducerPath: "solar",
    baseQuery: fetchBaseQuery({
        baseUrl: `https://solar.googleapis.com/v1`,
    }),

    tagTypes: [],

    endpoints: (builder) => ({
        getBuildingInsights: builder.query<
            BuildingInsights,
            { lat: number; lng: number }
        >({
            query: ({ lat, lng }) => ({
                url: "/buildingInsights:findClosest",
                params: {
                    "location.latitude": lat,
                    "location.longitude": lng,
                    requiredQuality: "MEDIUM",
                    key: process.env.NEXT_PUBLIC_MAP_API_KEY,
                },
            }),
        }),
    }),
});

export const { useGetBuildingInsightsQuery } = solar;
