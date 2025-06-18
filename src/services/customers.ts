import { IKanbanCardShort } from "@/types/tasks";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICustomer,
    ICustomerFilter,
    ICustomerMini,
    ICustomerPOST,
    ICustomerResultResponse,
    ICustomerTabCounts,
} from "@/types/customer";
import { ILabel } from "@/types/label";
import IPage from "@/types/page";
import { IProperties } from "@/types/properties";
import {
    apiWithTranslation,
    createLanguageAwareHook as la,
    createRemoveTabAwareHook as rt,
} from "./_util";

export interface BulkEditRequest {
    customerIds: number[];
    managerId?: number;
    labels?: number[];
    enableEmails?: boolean;
}

interface ICustomerParams {
    page: number;
    pageSize: number;
    sortBy: string;
    direction: string;
}

interface ICustomerFilterProps extends ICustomerParams {
    filter: ICustomerFilter;
}

interface ICreateCustomerFromStayUpdatedReq {
    notificationId: number;
    body: ICustomerPOST;
}

interface SuggestPropertiesReq {
    page: number;
    pageSize: number;
    customerId: number;
}

interface IOwnedProperties {
    id: number;
    code: string;
    parentCategory: string;
}

interface ISearchParams {
    searchString: string;
    b2b?: boolean;
}

interface IUploadAvatarReq {
    file: File;
    customerId: number;
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/customers`;
const notificationBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/contact/notification`;
const propertiesBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/property`;

export const customers = apiWithTranslation({
    reducerPath: "customers",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    tagTypes: [
        "Customers",
        "CustomerById",
        "CustomerByIdLabels",
        "OwnedProperties",
        "SuggestedProperties",
        "Tasks",
    ],

    endpoints: (builder) => ({
        allCustomers: builder.query<ICustomer[], void>({
            query: () => ({
                url: "all",
            }),
            providesTags: ["Customers"],
        }),

        getNames: builder.query<ICustomerMini[], void>({
            query: () => ({
                url: "names",
            }),
            providesTags: ["Customers"],
        }),

        getCustomerById: builder.query<ICustomer, number>({
            query: (id: number) => `${id}`,
            providesTags: ["CustomerById"],
        }),

        getCustomerLabels: builder.query<ILabel[], number>({
            query: (customerId: number) => `/${customerId}/labels`,
            providesTags: ["CustomerByIdLabels"],
        }),

        filterCustomers: builder.query<
            IPage<ICustomerResultResponse>,
            ICustomerFilterProps
        >({
            query: ({ filter: body, ...params }) => ({
                url: "/filter",
                method: "POST",
                body,
                params,
            }),
            providesTags: ["Customers"],
        }),

        findByEmail: builder.query<ICustomerMini, string>({
            query: (email) => ({
                url: "/find-by-email",
                params: {
                    email,
                },
            }),
            providesTags: ["CustomerById"],
        }),

        createOrUpdateCustomer: builder.mutation<number, ICustomerPOST>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: [
                "Customers",
                "CustomerById",
                "SuggestedProperties",
            ],
        }),

        bulkDeleteCustomers: builder.mutation<void, number[]>({
            query: (customerIds: number[]) => ({
                url: `/delete/bulk`,
                method: "DELETE",
                body: customerIds,
            }),
            invalidatesTags: ["Customers", "CustomerById"],
        }),
        bulkEditCustomers: builder.mutation<void, BulkEditRequest>({
            query: (body: BulkEditRequest) => ({
                url: `/edit/bulk`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Customers", "CustomerById"],
        }),

        searchCustomer: builder.query<ICustomerResultResponse[], ISearchParams>(
            {
                query: ({ searchString, b2b = false }) => ({
                    url: "/search",
                    params: { searchString, b2b },
                }),
                providesTags: ["Customers"],
            }
        ),

        deleteCustomer: builder.mutation<ICustomer, number>({
            query: (id: number) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customers"],
        }),

        // ---------------------------------------------------

        suggestForCustomer: builder.query<
            IPage<IProperties>,
            SuggestPropertiesReq
        >({
            query: (params) => ({
                url: `${propertiesBaseUrl}/customerSuggest`,
                params,
            }),
            providesTags: ["SuggestedProperties"],
        }),

        getOwnedProperties: builder.mutation<IOwnedProperties[], number[]>({
            query: (body) => ({
                url: "/owned-properties",
                body,
                method: "POST",
            }),
        }),

        // ---------------------------------------------------

        tabCount: builder.query<ICustomerTabCounts, number>({
            query: (customerId) => `/${customerId}/counts`,
        }),

        getTasks: builder.query<IKanbanCardShort[], number>({
            query: (id) => ({
                url: `/${id}/tickets`,
            }),
            providesTags: ["Tasks"],
        }),

        // ---------------------------------------------------

        createOrUpdateCustomerFromStayUpdated: builder.mutation<
            void,
            ICreateCustomerFromStayUpdatedReq
        >({
            query: ({ notificationId, body }) => ({
                url: `${notificationBaseUrl}/${notificationId}/register-customer`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customers", "CustomerById"],
        }),

        // ---------------------------------------------------

        uploadAvatar: builder.mutation<void, IUploadAvatarReq>({
            query: ({ customerId, file }) => {
                const body = new FormData();
                body.append("file", file);

                return {
                    url: `${customerId}/avatar`,
                    method: "POST",
                    body,
                    responseHandler: "text",
                };
            },
            invalidatesTags: ["Customers", "CustomerById"],
        }),

        removeAvatar: builder.mutation<void, number>({
            query: (customerId) => ({
                url: `${customerId}/avatar`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customers", "CustomerById"],
        }),
    }),
});

export const {
    useAllCustomersQuery,
    useGetNamesQuery,
    useFilterCustomersQuery,
    useFindByEmailQuery,
    useLazyFindByEmailQuery,
    useSearchCustomerQuery,
    useCreateOrUpdateCustomerMutation,
    useBulkEditCustomersMutation,
    useGetCustomerLabelsQuery,
    useLazyGetCustomerByIdQuery,

    useGetOwnedPropertiesMutation,

    useTabCountQuery,

    // ...
    useGetTasksQuery,
    // ...

    useCreateOrUpdateCustomerFromStayUpdatedMutation,

    useUploadAvatarMutation,
    useRemoveAvatarMutation,
} = customers;

const useGetCustomerByIdQuery = la(customers.useGetCustomerByIdQuery);
const useSuggestForCustomerQuery = la(customers.useSuggestForCustomerQuery);

export { useGetCustomerByIdQuery, useSuggestForCustomerQuery };

const useDeleteCustomerMutation = rt(customers.useDeleteCustomerMutation);
const useBulkDeleteCustomersMutation = rt(
    customers.useBulkDeleteCustomersMutation
);

export { useDeleteCustomerMutation, useBulkDeleteCustomersMutation };
