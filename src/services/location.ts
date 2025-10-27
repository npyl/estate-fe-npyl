import { createApi } from "@reduxjs/toolkit/query/react";
import { IGeoLocation } from "src/types/geolocation";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

interface IGetClosestParams {
    longitude: number;
    latitude: number;
}

export const location = createApi({
    reducerPath: "location",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/geography/`,
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
