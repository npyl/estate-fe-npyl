import AirQuality from "@/types/googleapi/airQuality";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airQuality = createApi({
    reducerPath: "airQuality",
    baseQuery: fetchBaseQuery({
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
                    key: process.env.NEXT_PUBLIC_MAP_API_KEY,
                },
                method: "POST",
            }),
        }),
    }),
});

export const { useGetAirQualityQuery } = airQuality;
