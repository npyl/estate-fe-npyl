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

interface IUploadAvatarReq {
    file: File;
    organisationId: number;
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

    tagTypes: ["Organizations", "OrganizationById"],

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

        getOrganization: builder.query<IOrganization, number>({
            query: (id) => `/${id}`,
            providesTags: ["OrganizationById"],
        }),

        allOrganizations: builder.query<IOrganization[], void>({
            query: () => "/all",
            providesTags: ["Organizations"],
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

export const {
    useCreateOrUpdateOrganizationMutation,
    useFilterOrganizationsQuery,
    useGetOrganizationQuery,
    useAllOrganizationsQuery,
    // -----------------------
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
} = organization;
