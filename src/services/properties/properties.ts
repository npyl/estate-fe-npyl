import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IProperties,
    IPropertyCodeRes,
    IPropertyFilter,
    IPropertyFilterCounters,
    IPropertyMarker,
    IPropertyResultResponse,
    IValuationRes,
    IPropertyTabCounts,
} from "@/types/properties";
import IPage from "@/types/page";
import { ILabel } from "@/types/label";
import { ICustomer, ICustomerMini } from "@/types/customer";
import { LocationDisplay } from "@/types/enums";
import { IOpenAIDetailsPOST } from "src/types/openai";
import { IListings } from "@/types/listings";
import { IKanbanCardShort } from "@/types/tasks";
import { IPropertyFile } from "@/types/file";

import {
    apiWithTranslation,
    createLanguageAwareHook as la,
    createRemoveTabAwareHook as rt,
} from "@/services/_util";

interface JustData<T> {
    data: T;
}

export interface BulkEditRequest {
    propertyIds: number[];
    managerId?: number;
    ownerId?: number;
    zipcode?: number;
    area?: number;
    labels?: number[];
    bedrooms?: number;
    state?: string;
    exclusive?: boolean;
}

interface ICreatePropertyParams {
    parentCategory: string;
    category: string;
}

interface IPropertyFilterParams {
    filter: IPropertyFilter;
    page: number;
    pageSize: number;
    // ...
    sortBy: string;
    direction: string; // asc - desc
}
interface IPropertySearchParams {
    searchString: string;
    page: number;
    pageSize: number;
    sortBy?: string;
    // INFO: narrows the search only to a specific customer's properties
    customer?: number;
}

interface ISuggestForPropertyParams {
    propertyId: number;
    page: number;
    pageSize: number;
}

interface EditLocationDisplayProps {
    propertyId: number;
    display: LocationDisplay;
}

export const properties = apiWithTranslation({
    reducerPath: "properties",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/property`,
    }),
    tagTypes: [
        "Properties",
        "PropertyById",
        "PropertyByIdListings",
        "FilterProperties",
        "FilterCounters",
        "SuggestedCustomers",

        // attributes
        "PropertyByIdImages",
        "PropertyByIdLabels",
        "PropertyByIdDocuments",
        "PropertyByIdBlueprints",
        "PropertyByIdGoogleEarth",
        "PropertyByIdZip",

        // ...
        "Tasks",

        // ...
        "Archived",

        "PDF",
    ],
    endpoints: (builder) => ({
        allPropertyCodes: builder.query<IPropertyCodeRes[], void>({
            query: () => "/codes",
        }),

        getPropertyLocationMarkers: builder.query<
            IPropertyMarker[],
            IPropertyFilter
        >({
            query: (body) => ({
                url: "location-markers",
                method: "POST",
                body,
            }),
            providesTags: ["Properties"],
        }),

        getPropertyById: builder.query<IProperties, number>({
            query: (id) => `${id}`,
            providesTags: ["PropertyById"],
        }),

        getTabCount: builder.query<IPropertyTabCounts, number>({
            query: (propertyId) => `/${propertyId}/counts`,
            providesTags: ["PropertyById"],
        }),

        getPropertyByCode: builder.query<IProperties, string>({
            query: (code) => `code/${code}`,
            providesTags: ["Properties"],
        }),
        getPropertyListings: builder.query<IListings, number>({
            query: (id) => `${id}/listings`,
            providesTags: ["PropertyByIdListings"],
        }),
        getPropertyCardById: builder.query<IPropertyResultResponse, number>({
            query: (propertyId) => `card/${propertyId}`,
            providesTags: ["Properties"],
        }),
        getOwners: builder.mutation<ICustomerMini[], number[]>({
            query: (body) => ({
                url: "/owners",
                body,
                method: "POST",
            }),
        }),

        // Attributes
        getPropertyLabels: builder.query<ILabel[], number>({
            query: (propertyId) => `${propertyId}/labels`,
            providesTags: ["PropertyByIdLabels"],
        }),

        // mutations
        createProperty: builder.mutation<
            JustData<number>,
            ICreatePropertyParams
        >({
            query: (params) => ({
                url: "/create",
                method: "POST",
                params,
            }),
            invalidatesTags: ["Properties"],
        }),
        cloneProperty: builder.mutation<number, number>({
            query: (propertyId) => ({
                url: `/clone/${propertyId}`,
                method: "POST",
            }),
            invalidatesTags: ["Properties"],
        }),
        bulkEditProperties: builder.mutation<void, BulkEditRequest>({
            query: (body) => ({
                url: `/edit/bulk`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties", "Archived", "PropertyById"],
        }),

        filterProperties: builder.query<
            IPage<IPropertyResultResponse>,
            IPropertyFilterParams
        >({
            query: ({ filter, page, pageSize, sortBy, direction }) => ({
                url: "/filter",
                method: "POST",
                body: filter,
                params: {
                    page,
                    pageSize,
                    sortBy,
                    direction,
                },
            }),
            providesTags: ["Properties"],
        }),

        getFilterCounters: builder.query<
            IPropertyFilterCounters,
            IPropertyFilter
        >({
            query: (body) => ({
                url: "/filter-numbering",
                body,
                method: "POST",
            }),
            providesTags: ["FilterCounters"],
        }),

        suggestForProperty: builder.query<
            IPage<ICustomer>,
            ISuggestForPropertyParams
        >({
            query: (params) => ({
                url: "/matchingCustomers",
                params: params,
            }),
            providesTags: ["SuggestedCustomers"],
        }),
        searchProperty: builder.query<
            IPage<IPropertyResultResponse>,
            IPropertySearchParams
        >({
            query: (params) => ({
                url: "/search",
                params,
            }),
            providesTags: ["Properties"],
        }),
        editLocationDisplay: builder.mutation<void, EditLocationDisplayProps>({
            query: ({ propertyId, display }) => ({
                url: `/edit/${propertyId}/locationdisplay`,
                method: "PUT",
                params: { display },
            }),
            invalidatesTags: ["PropertyById"],
        }),

        // checks
        checkCodeExists: builder.query<boolean, string>({
            query: (code) => ({
                url: "/check/code",
                params: { code },
            }),
        }),
        checkKeyCodeExists: builder.query<boolean, string>({
            query: (code) => ({
                url: "/check/keycode",
                params: { code },
            }),
        }),

        generateDescription: builder.mutation<string, IOpenAIDetailsPOST>({
            query: (body) => ({
                url: `/description/generate`,
                method: "POST",
                body: {
                    ...body,
                    styling: body.styling || false,
                },
                responseHandler: "text",
            }),
        }),

        improveDescription: builder.mutation<string, IOpenAIDetailsPOST>({
            query: (body) => {
                return {
                    url: `/description/improve`,
                    method: "POST",
                    body: {
                        ...body,
                        oldDescription: body.oldDescription || "",
                        improveOption: body.improveOption || "CONCISE", // ensure improveOption is passed
                        styling: body.styling || false,
                    },
                    responseHandler: "text",
                };
            },
        }),

        // -------------------------------------------------------------------------

        getTasks: builder.query<IKanbanCardShort[], number>({
            query: (id) => ({
                url: `/${id}/tickets`,
            }),
            providesTags: ["Tasks"],
        }),

        // -------------------------------------------------------------------------

        archivedCount: builder.query<number, void>({
            query: () => "/archive/count",
            providesTags: ["Archived"],
        }),

        filterArchived: builder.query<
            IPage<IPropertyResultResponse>,
            IPropertyFilterParams
        >({
            query: ({ filter, page, pageSize, sortBy, direction }) => ({
                url: "/archive/filter",
                method: "POST",
                body: filter,
                params: {
                    page,
                    pageSize,
                    sortBy,
                    direction,
                },
            }),
            providesTags: ["Archived"],
        }),
        restoreProperty: builder.mutation<void, number>({
            query: (id) => ({
                url: `/archive/restore/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Archived", "Properties"],
        }),
        bulkArchiveProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/archive/bulk`,
                method: "DELETE",
                body: propertyIds,
            }),
            invalidatesTags: ["Archived", "Properties"],
        }),
        bulkRestoreProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/archive/restore/bulk`,
                method: "POST",
                body: propertyIds,
            }),
            invalidatesTags: ["Archived", "Properties"],
        }),

        // -----------------------------------------------------------

        // INFO: this has to do with how backend handles Archive and Delete but the gist is:
        //  for non-permanent: call deleteProperty (this will make the property show up on the Archives page)
        //  for permanent: call deletePermanentProperty (this will completely delete the property independently of where it is)

        deleteProperty: builder.mutation<IProperties, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "Archived"],
        }),
        deletePermanentProperty: builder.mutation<void, number>({
            query: (id) => ({
                url: `/archive/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Archived", "Properties"],
        }),
        bulkDeleteProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/delete/bulk`,
                method: "DELETE",
                body: propertyIds,
            }),
            invalidatesTags: ["Properties", "Archived", "PropertyById"],
        }),
        bulkDeletePermanentProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/archive/delete/bulk`,
                method: "DELETE",
                body: propertyIds,
            }),
            invalidatesTags: ["Archived", "Properties"],
        }),

        // --------------------------------------------------------------------

        getPDFGeneratedAt: builder.query<number, number>({
            query: (propertyId) => `/${propertyId}/pdfGeneratedAt`,
            providesTags: ["PDF"],
        }),

        getPDF: builder.query<IPropertyFile, number>({
            query: (propertyId) => `/${propertyId}/export`,
            providesTags: ["PDF"],
        }),

        generatePDF: builder.mutation<void, number>({
            query: (propertyId) => ({
                url: `/${propertyId}/generate-export`,
                method: "POST",
                params: {
                    qrPath: "", // TODO: I think this is handled from the BE now!
                },
            }),
            invalidatesTags: ["PDF"],
        }),

        valuationByFilters: builder.query<IValuationRes, IPropertyFilter>({
            query: (body) => ({
                url: "/valuate",
                method: "POST",
                body,
            }),
            providesTags: ["Properties"],
        }),
    }),
});

export const {
    // get
    useGetFilterCountersQuery,
    useAllPropertyCodesQuery,
    useLazyGetPropertyByCodeQuery,
    useLazyGetPropertyByIdQuery,
    useGetPropertyListingsQuery,
    useGetPropertyLocationMarkersQuery,
    useGetTabCountQuery,
    // mutations
    useCreatePropertyMutation,
    useClonePropertyMutation,
    useSuggestForPropertyQuery,
    useBulkEditPropertiesMutation,
    useEditLocationDisplayMutation,
    useGetOwnersMutation,

    // check
    useLazyCheckCodeExistsQuery,
    useLazyCheckKeyCodeExistsQuery,

    // attributes
    useGetPropertyLabelsQuery,

    // description editor
    useGenerateDescriptionMutation,
    useImproveDescriptionMutation,

    // ...
    useGetTasksQuery,

    // ...
    useArchivedCountQuery,
    useRestorePropertyMutation,
    useBulkArchivePropertiesMutation,
    useBulkRestorePropertiesMutation,

    // ...
    useGetPDFGeneratedAtQuery,
    useGeneratePDFMutation,

    useValuationByFiltersQuery,
} = properties;

const useSearchPropertyQuery = la(properties.useSearchPropertyQuery);

const useGetPropertyByIdQuery = la(properties.useGetPropertyByIdQuery);
const useGetPropertyCardByIdQuery = la(properties.useGetPropertyCardByIdQuery);
const useGetPropertyByCodeQuery = la(properties.useGetPropertyByCodeQuery);

const useFilterPropertiesQuery = la(properties.useFilterPropertiesQuery);
const useFilterArchivedQuery = la(properties.useFilterArchivedQuery);

const useGetPDFQuery = la(properties.useGetPDFQuery);

const useDeletePropertyMutation = rt(properties.useDeletePropertyMutation);
const useDeletePermanentPropertyMutation = rt(
    properties.useDeletePermanentPropertyMutation
);
const useBulkDeletePropertiesMutation = rt(
    properties.useBulkDeletePropertiesMutation
);
const useBulkDeletePermanentPropertiesMutation = rt(
    properties.useBulkDeletePermanentPropertiesMutation
);

export {
    useDeletePropertyMutation,
    useDeletePermanentPropertyMutation,
    useBulkDeletePropertiesMutation,
    useBulkDeletePermanentPropertiesMutation,
};

export {
    useSearchPropertyQuery,
    // ...
    useGetPropertyByIdQuery,
    useGetPropertyCardByIdQuery,
    useGetPropertyByCodeQuery,
    // ...
    useFilterPropertiesQuery,
    useFilterArchivedQuery,
    // ...
    useGetPDFQuery,
};

export type { IPropertyFilterParams };
