import {
    IOrganization,
    IOrganizationReq,
    IOrganizationFilter,
    IOrganizationShortRes,
} from "@/types/organization";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createRemoveTabAwareHook as rt } from "./_util";
import { IProperties } from "@/types/properties";

interface IFirmFitlerReq {
    body: IOrganizationFilter;

    page: number;
    pageSize: number;
    sortBy: string;
    direction: string;
}

interface IUploadAvatarReq {
    file: File;
    organisationId: number;
}

interface ISuggestReq {
    page: number;
    pageSize: number;
    organizationId: number;
}

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

    tagTypes: [
        "Organizations",
        "OrganizationById",
        // ...
        "OwnedProperties",
        "MatchingProperties",
    ],

    endpoints: (builder) => ({
        createOrUpdateOrganization: builder.mutation<number, IOrganizationReq>({
            query: ({ id, ...body }) => ({
                url: Boolean(id) ? `${id}` : "",
                method: Boolean(id) ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["Organizations", "OrganizationById"],
        }),

        filterOrganizations: builder.query<
            IPage<IOrganizationShortRes>,
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

        getOrganization: builder.query<IOrganization, number>({
            query: (id) => `/${id}`,
            providesTags: ["OrganizationById"],
        }),

        allOrganizations: builder.query<IOrganization[], void>({
            query: () => "",
            providesTags: ["Organizations"],
        }),

        deleteOrganization: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Organizations", "OrganizationById"],
        }),

        // -----------------------------------------------------------

        ownedProperties: builder.query<IPage<IProperties>, ISuggestReq>({
            query: ({ organizationId, ...params }) => ({
                url: `${organizationId}/ownedProperties`,
                params,
            }),
            providesTags: ["OwnedProperties"],
        }),

        matchingProperties: builder.query<IPage<IProperties>, ISuggestReq>({
            query: ({ organizationId, ...params }) => ({
                url: `${organizationId}/matchingProperties`,
                params,
            }),
            providesTags: ["MatchingProperties"],
        }),

        // -----------------------------------------------------------

        uploadAvatar: builder.mutation<void, IUploadAvatarReq>({
            query: ({ organisationId, file }) => {
                const formData = new FormData();
                formData.append("file", file);

                return {
                    url: `${organisationId}/avatar`,
                    method: "POST",
                    body: formData,
                    responseHandler: "text",
                };
            },
            invalidatesTags: ["Organizations", "OrganizationById"],
        }),

        removeAvatar: builder.mutation<void, number>({
            query: (organisationId) => ({
                url: `${organisationId}/avatar`,
                method: "DELETE",
            }),
            invalidatesTags: ["Organizations", "OrganizationById"],
        }),
    }),
});

const useDeleteOrganizationMutation = rt(
    organization.useDeleteOrganizationMutation
);

export { useDeleteOrganizationMutation };

export const {
    useCreateOrUpdateOrganizationMutation,
    useFilterOrganizationsQuery,
    useGetOrganizationQuery,
    useAllOrganizationsQuery,

    useOwnedPropertiesQuery,
    useMatchingPropertiesQuery,
    // -----------------------
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
} = organization;
