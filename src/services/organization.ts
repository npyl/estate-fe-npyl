import {
    IOrganization,
    IOrganizationReq,
    IOrganizationFilter,
} from "@/types/organization";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IFirmFitlerReq {
    body: IOrganizationFilter;
    page: number;
    pageSize: number;
}

type IFirmFitlerRes = IPage<IOrganization>;

export const organization = createApi({
    reducerPath: "organization",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/organization",
    }),

    tagTypes: ["Organizations"],

    endpoints: (builder) => ({
        createOrUpdateOrganization: builder.mutation<number, IOrganizationReq>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Organizations"],
        }),

        filterOrganizations: builder.query<IFirmFitlerRes, IFirmFitlerReq>({
            query: ({ body, page, pageSize }) => ({
                url: "/filter",
                method: "POST",
                body,
                params: {
                    page,
                    pageSize,
                },
            }),
            providesTags: ["Organizations"],
        }),

        allOrganizations: builder.query<IOrganization[], void>({
            query: () => "/all",
            providesTags: ["Organizations"],
        }),
    }),
});

export const {
    useCreateOrUpdateOrganizationMutation,
    useFilterOrganizationsQuery,
    useAllOrganizationsQuery,
} = organization;
