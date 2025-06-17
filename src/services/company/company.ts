import { IPropertyFileRes } from "@/types/file";
import { IIntegration, IIntegrationPOST } from "@/types/integrations";
import { IntegrationSite } from "@/types/listings";
import { IUserMini } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CompanyImageType,
    ICompany,
    ICompanyPOST,
    IPublicSiteReq,
    IPublicSitesRes,
} from "@/types/company";

interface IUploadCompanyImage {
    contentType: string;
    filename: string;
    size: number;
    type: CompanyImageType;
}

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

    tagTypes: ["Company", "CompanyIntegrations", "CompanyPublicSites"],

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

        getIntegrations: builder.query<IIntegration, IntegrationSite>({
            query: (site) => ({
                url: "/integration-credentials",
                params: { site },
            }),
            providesTags: ["CompanyIntegrations"],
        }),

        getMembers: builder.query<IUserMini[], number>({
            query: (companyId) => ({
                url: `${companyId}/members`,
            }),
        }),

        // -------------------------------------------------------------

        updateIntegrations: builder.mutation<void, IIntegrationPOST>({
            query: (body) => ({
                url: "/integration-credentials",
                method: "POST",
                body,
                params: { site: body.site },
            }),
            invalidatesTags: ["CompanyIntegrations"],
        }),

        // Logo or Watermark
        uploadCompanyImage: builder.mutation<
            IPropertyFileRes,
            IUploadCompanyImage
        >({
            query: (body) => ({
                url: "/upload-company-image",
                method: "POST",
                body,
            }),
            // INFO: call invalidate after amazon push (just like we do with images)
        }),

        removeCompanyImage: builder.mutation<void, CompanyImageType>({
            query: (type) => ({
                url: "/remove-company-image",
                method: "DELETE",
                params: {
                    type,
                },
            }),
            invalidatesTags: ["Company"],
        }),

        // ----------------------------------------------------------------------------

        getPublicSites: builder.query<IPublicSitesRes[], void>({
            query: () => "/public-sites",
            providesTags: ["CompanyPublicSites"],
        }),

        addPublicSite: builder.mutation<void, IPublicSiteReq>({
            query: (body) => ({ url: "/public-sites", method: "POST", body }),
            invalidatesTags: ["CompanyPublicSites"],
        }),

        removePublicSite: builder.mutation<void, number>({
            query: (siteId) => ({
                url: `/public-sites/${siteId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CompanyPublicSites"],
        }),
    }),
});

export const {
    useGetCompanyDetailsQuery,
    useUpdateCompanyDetailsMutation,
    useGetIntegrationsQuery,
    useUpdateIntegrationsMutation,
    useUploadCompanyImageMutation,
    useRemoveCompanyImageMutation,

    useGetMembersQuery,

    useGetPublicSitesQuery,
    useAddPublicSiteMutation,
    useRemovePublicSiteMutation,
} = company;
