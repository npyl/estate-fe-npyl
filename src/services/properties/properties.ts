import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IProperties,
    IPropertiesPOST,
    IPropertyCodeRes,
    IPropertyFilter,
    IPropertyFilterCounters,
    IPropertyMarker,
    IPropertyResultResponse,
} from "src/types/properties";
import IPage from "src/types/page";

import { ILabel } from "src/types/label";
import { ICustomer } from "src/types/customer";

import { LocationDisplay } from "src/types/enums";
import { IOpenAIDetailsPOST } from "src/types/openai";
import { IListings } from "@/types/listings";
import { IKanbanCardShort } from "@/types/tasks";
import { apiWithTranslation, createLanguageAwareHook as la } from "../_util";

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
}

interface ICreatePropertyParams {
    parentCategory: string;
    category: string;
}
interface IEditPropertyProps {
    id: number;
    body: IPropertiesPOST;
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

    // INFO: narrows the search only to a specific customer's properties
    customer?: number;
}
interface ISuggestForCustomerParams {
    customerId: number;
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
        "SuggestedProperties",
        "SuggestedCustomers",

        // attributes
        "PropertyByIdImages",
        "PropertyByIdLabels",
        "PropertyByIdDocuments",
        "PropertyByIdBlueprints",
        "PropertyByIdZip",

        // ...
        "Tasks",

        // ...
        "Archived",
    ],
    endpoints: (builder) => ({
        allProperties: builder.query<IProperties[], void>({
            query: () => "all",
            providesTags: ["Properties"],
        }),

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

        // Attributes
        getPropertyLabels: builder.query<ILabel[], number>({
            query: (propertyId) => `${propertyId}/labels`,
            providesTags: ["PropertyByIdLabels"],
        }),

        // mutations
        editProperty: builder.mutation<number, IEditPropertyProps>({
            query: ({ body, id }) => ({
                url: `/edit/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
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
        bulkDeleteProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/delete/bulk`,
                method: "DELETE",
                body: propertyIds,
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

        suggestForCustomer: builder.query<
            IProperties[],
            ISuggestForCustomerParams
        >({
            query: (params) => ({
                url: "/customerSuggest-list",
                params,
            }),
            providesTags: ["SuggestedProperties"],
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
        deleteProperty: builder.mutation<IProperties, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "Archived"],
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
        archiveProperty: builder.mutation<void, number>({
            query: (id) => ({
                url: `/archive/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Archived", "Properties"],
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
        bulkDeleteArchivedProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/archive/delete/bulk`,
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

    // mutations
    useEditPropertyMutation,
    useCreatePropertyMutation,
    useClonePropertyMutation,
    useDeletePropertyMutation,
    useSuggestForPropertyQuery,
    useBulkEditPropertiesMutation,
    useBulkDeletePropertiesMutation,
    useEditLocationDisplayMutation,

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
    useArchivePropertyMutation,
    useRestorePropertyMutation,
    useBulkArchivePropertiesMutation,
    useBulkDeleteArchivedPropertiesMutation,
    useBulkRestorePropertiesMutation,
} = properties;

// TODO: this is taking a huge amount of time to come! -> Find better alternatives where it is used.
const useAllPropertiesQuery = la(properties.useAllPropertiesQuery);
const useSearchPropertyQuery = la(properties.useSearchPropertyQuery);

const useGetPropertyByIdQuery = la(properties.useGetPropertyByIdQuery);
const useGetPropertyCardByIdQuery = la(properties.useGetPropertyCardByIdQuery);
const useGetPropertyByCodeQuery = la(properties.useGetPropertyByCodeQuery);

const useSuggestForCustomerQuery = la(properties.useSuggestForCustomerQuery);

const useFilterPropertiesQuery = la(properties.useFilterPropertiesQuery);
const useFilterArchivedQuery = la(properties.useFilterArchivedQuery);

export {
    useAllPropertiesQuery,
    useSearchPropertyQuery,
    // ...
    useGetPropertyByIdQuery,
    useGetPropertyCardByIdQuery,
    useGetPropertyByCodeQuery,
    // ...
    useSuggestForCustomerQuery,
    // ...
    useFilterPropertiesQuery,
    useFilterArchivedQuery,
};
