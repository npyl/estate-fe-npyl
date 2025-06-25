import { IPropertyFileRes } from "@/types/file";
import {
    IIntegrationCredentials,
    IIntegrationCredentialsPOST,
} from "@/types/integrations";
import { IntegrationSite } from "@/types/integrations";
import { IUserMini } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BlogPostReq,
    BlogPostRes,
    CompanyImageType,
    ICompany,
    ICompanyPOST,
    IPublicSiteReq,
    IPublicSitesRes,
} from "@/types/company";
import IPage from "@/types/page";

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

interface IPublishBlogPostReq {
    siteId: number;
    post: BlogPostReq;
}

interface IBlogPostByIdReq {
    siteId: number;
    postId: number;
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

        // -------------------------------------------------------------------------

        getBlogPosts: builder.query<IPage<BlogPostRes[]>, number>({
            query: (siteId) => `/public-sites/${siteId}/blog/all`,
            providesTags: ["BlogPosts"],
        }),

        getBlogPostById: builder.query<BlogPostRes, IBlogPostByIdReq>({
            query: ({ siteId, postId }) =>
                `/public-sites/${siteId}/blog/${postId}`,
            providesTags: ["BlogPostById"],
        }),

        createOrUpdateBlogPost: builder.mutation<void, IPublishBlogPostReq>({
            query: (siteId) => ({
                url: `/public-sites/${siteId}/blog`,
                method: "POST",
            }),
            invalidatesTags: ["BlogPosts", "BlogPostById"],
        }),

        deleteBlogPost: builder.mutation<void, IBlogPostByIdReq>({
            query: ({ siteId, postId }) => ({
                url: `/public-sites/${siteId}/blog/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BlogPosts"],
        }),

        // -------------------------------------------------------------------------
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

    useGetBlogPostsQuery,
    useGetBlogPostByIdQuery,
    useCreateOrUpdateBlogPostMutation,
    useDeleteBlogPostMutation,
} = company;
