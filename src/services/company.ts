import { IIntegration, IIntegrationPOST } from "@/types/integrations";
import { ListingTypes } from "@/types/listings";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompany, ICompanyPOST } from "src/types/company";

export const company = createApi({
    reducerPath: "company",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/company`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),

    tagTypes: ["Company", "CompanyIntegrations"],

    endpoints: (builder) => ({
        getCompanyDetails: builder.query<ICompany, void>({
            query: () => ({
                url: "/details",
            }),
            providesTags: ["Company"],
        }),
        updateCompanyDetails: builder.mutation<void, ICompanyPOST>({
            query: (body) => ({
                url: "/details",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Company"],
        }),

        getIntegrations: builder.query<IIntegration, ListingTypes>({
            query: (site) => ({
                url: "/integration-credentials",
                params: { site },
            }),
            providesTags: ["CompanyIntegrations"],
        }),
        updateIntegrations: builder.mutation<void, IIntegrationPOST>({
            query: (body) => ({
                url: "/integration-credentials",
                method: "POST",
                body,
                params: { site: body.site },
            }),
            invalidatesTags: ["CompanyIntegrations"],
        }),
    }),
});

export const {
    useGetCompanyDetailsQuery,
    useUpdateCompanyDetailsMutation,
    useGetIntegrationsQuery,
    useUpdateIntegrationsMutation,
} = company;
