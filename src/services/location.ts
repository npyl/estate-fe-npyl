// src/services/location.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGeoLocation } from "src/types/geolocation";

interface IGetClosestParams {
    longitude: number;
    latitude: number;
}

export const location = createApi({
    reducerPath: "location",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/geography/`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRegions: builder.query<IGeoLocation[], void>({
            query: () => ({
                url: `regions`,
            }),
        }),
        getMunicipalities: builder.query<IGeoLocation[], number>({
            query: (parentID) => ({
                url: `/hierarchy/${parentID}/municipalities/2`,
            }),
        }),
        getNeighbourhoods: builder.query<IGeoLocation[], number>({
            query: (parentID) => ({
                url: `/hierarchy/${parentID}/municipalities/3`,
            }),
        }),
        getClosest: builder.query<IGeoLocation, IGetClosestParams>({
            query: (params: IGetClosestParams) => ({
                url: "/hierarchy/closest",
                params,
            }),
        }),
        getHierarchyByAreaId: builder.query<IGeoLocation, number>({
            query: (areaId: number) => ({
                url: `/hierarchy/area/${areaId}`,
            }),
        }),
        // Example of a query for the LocationSearchItem component
        searchLocations: builder.query<IGeoLocation[], string>({
            query: (search) => ({
                url: `/hierarchy/suggestions`,
                params: {
                    search,
                },
            }),
        }),
    }),
});

export const {
    useGetRegionsQuery,
    useGetMunicipalitiesQuery,
    useGetNeighbourhoodsQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetNeighbourhoodsQuery,
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
    useSearchLocationsQuery,
} = location;
