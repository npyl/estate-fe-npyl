import { BuildingInsights } from "@/sections/Properties/ViewById/(tabs)/Green/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

export const solar = createApi({
    reducerPath: "solar",
    baseQuery: getBaseQueryWithReauth({
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
                    key: process.env.NEXT_PUBLIC_MAP_API_KEY1,
                },
            }),
        }),
    }),
});

export const { useGetBuildingInsightsQuery } = solar;
