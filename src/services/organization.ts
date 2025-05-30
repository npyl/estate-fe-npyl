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
    sortBy: string;
    direction: string;
}

type IOrganizationFitlerRes = IPage<IOrganization>;

export const organization = createApi({
    reducerPath: "organization",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/organizations`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
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

        filterOrganizations: builder.query<
            IOrganizationFitlerRes,
            IFirmFitlerReq
        >({
            query: ({ body, ...params }) => ({
                url: "/filter",
                method: "POST",
                body,
                params,
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
