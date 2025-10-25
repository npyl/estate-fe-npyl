import { IPropertyFileRes } from "@/types/file";
import {
    IIntegrationCredentials,
    IIntegrationCredentialsPOST,
    IntegrationSite,
} from "@/types/integrations";
import { IUserMini } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
    CompanyImageType,
    ICompany,
    ICompanyPOST,
    IPublicSiteReq,
    IPublicSitesRes,
} from "@/types/company";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

interface IUploadCompanyImage {
    contentType: string;
    filename: string;
    size: number;
    type: CompanyImageType;
}

interface IIntegration {
    id: IntegrationSite;
    name: string;
}

const INTEGRATION_SITES: IIntegration[] = [
    { id: "SPITOGATOS", name: "Spitogatos.gr" },
    { id: "PLOT_GR", name: "plot.gr" },
    { id: "JAMES_EDITION", name: "jamesedition.com" },
];

export const company = createApi({
    reducerPath: "company",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/company`,
    }),

    tagTypes: [
        "Company",
        "CompanyIntegrations",
        "CompanyPublicSites",
        // ...
        "BlogPosts",
        "BlogPostById",
    ],

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

        getIntegrationCredentials: builder.query<
            IIntegrationCredentials,
            IntegrationSite
        >({
            query: (site) => ({
                url: "/integration-credentials",
                params: { site },
            }),
            providesTags: ["CompanyIntegrations"],
        }),

        getIntegrations: builder.query<IIntegration[], void>({
            queryFn: () => ({ data: INTEGRATION_SITES }),
        }),

        getMembers: builder.query<IUserMini[], number>({
            query: (companyId) => ({
                url: `${companyId}/members`,
            }),
        }),

        // -------------------------------------------------------------

        updateIntegrations: builder.mutation<void, IIntegrationCredentialsPOST>(
            {
                query: (body) => ({
                    url: "/integration-credentials",
                    method: "POST",
                    body,
                    params: { site: body.site },
                }),
                invalidatesTags: ["CompanyIntegrations"],
            }
        ),

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
    useGetIntegrationCredentialsQuery,
    useGetIntegrationsQuery,
    useUpdateIntegrationsMutation,
    useUploadCompanyImageMutation,
    useRemoveCompanyImageMutation,

    useGetMembersQuery,

    useGetPublicSitesQuery,
    useAddPublicSiteMutation,
    useRemovePublicSiteMutation,
} = company;
