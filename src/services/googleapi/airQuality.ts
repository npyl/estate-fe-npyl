import AirQuality from "@/types/googleapi/airQuality";
import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

export const airQuality = createApi({
    reducerPath: "airQuality",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `https://airquality.googleapis.com/v1/`,
    }),

    tagTypes: [],

    endpoints: (builder) => ({
        getAirQuality: builder.query<AirQuality, { lat: number; lng: number }>({
            query: ({ lat, lng }) => ({
                url: "/currentConditions:lookup",
                body: JSON.stringify({
                    universalAqi: true,
                    location: {
                        latitude: lat,
                        longitude: lng,
                    },
                    extraComputations: [
                        "HEALTH_RECOMMENDATIONS",
                        "DOMINANT_POLLUTANT_CONCENTRATION",
                        "POLLUTANT_CONCENTRATION",
                        "LOCAL_AQI",
                        "POLLUTANT_ADDITIONAL_INFO",
                    ],
                    languageCode: localStorage.getItem("language") ?? "el",
                }),
                params: {
                    key: process.env.NEXT_PUBLIC_MAP_API_KEY1,
                },
                method: "POST",
            }),
        }),
    }),
});

export const { useGetAirQualityQuery } = airQuality;
