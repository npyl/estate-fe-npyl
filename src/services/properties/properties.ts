import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IProperties,
    IPropertiesPOST,
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

interface IContent<T> {
    content: T[];
}

export const properties = createApi({
    reducerPath: "properties",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/property`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );

            return headers;
        },
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
    ],
    endpoints: (builder) => ({
        allProperties: builder.query<IProperties[], void>({
            query: () => ({
                url: "all",
            }),

            providesTags: ["Properties"],
        }),

        allPropertyCodes: builder.query<string[], void>({
            query: () => ({
                url: "/codes",
            }),
        }),

        getPropertyLocationMarkers: builder.query<IPropertyMarker[], void>({
            query: () => ({
                url: "location-markers",
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
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        bulkDeleteProperties: builder.mutation<void, number[]>({
            query: (propertyIds) => ({
                url: `/delete/bulk`,
                method: "DELETE",
                body: propertyIds,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
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
        // INFO: This is permanent delete (requires login by admin); later I will introduce an archiveProperty mutation aswell
        deleteProperty: builder.mutation<IProperties, number>({
            query: (id) => ({
                url: `/archive/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties"],
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
    }),
});

export const {
    // get
    useSearchPropertyQuery,
    useFilterPropertiesQuery,
    useGetFilterCountersQuery,
    useAllPropertiesQuery,
    useAllPropertyCodesQuery,
    useGetPropertyByIdQuery,
    useGetPropertyByCodeQuery,
    useLazyGetPropertyByCodeQuery,
    useLazyGetPropertyByIdQuery,
    useGetPropertyListingsQuery,
    useGetPropertyLocationMarkersQuery,
    useGetPropertyCardByIdQuery,

    // mutations
    useEditPropertyMutation,
    useCreatePropertyMutation,
    useClonePropertyMutation,
    useDeletePropertyMutation,
    useSuggestForCustomerQuery,
    useSuggestForPropertyQuery,
    useBulkEditPropertiesMutation,
    useBulkDeletePropertiesMutation,
    useEditLocationDisplayMutation,

    // check
    useLazyCheckCodeExistsQuery,
    useLazyCheckKeyCodeExistsQuery,

    useGenerateDescriptionMutation,
    useImproveDescriptionMutation,
    // attributes
    useGetPropertyLabelsQuery,
} = properties;
