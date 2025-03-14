import { IKanbanCardShort } from "@/types/tasks";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICustomer,
    ICustomerFilter,
    ICustomerMini,
    ICustomerPOST,
    ICustomerResultResponse,
} from "src/types/customer";
import { ILabel } from "src/types/label";
import IPage from "src/types/page";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";
import { IProperties } from "@/types/properties";

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

        searchCustomer: builder.query<ICustomerResultResponse[], string>({
            query: (searchString: string) => {
                return {
                    url: "/search",
                    params: { searchString },
                };
            },
            providesTags: ["Customers"],
        }),

        deleteCustomer: builder.mutation<ICustomer, number>({
            query: (id: number) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Customers"],
        }),

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

        // ---------------------------------------------------

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
    useDeleteCustomerMutation,
    useBulkEditCustomersMutation,
    useBulkDeleteCustomersMutation,
    useGetCustomerLabelsQuery,
    useLazyGetCustomerByIdQuery,

    // ...
    useGetTasksQuery,
    // ...

    useCreateOrUpdateCustomerFromStayUpdatedMutation,
} = customers;

const useGetCustomerByIdQuery = la(customers.useGetCustomerByIdQuery);
const useSuggestForCustomerQuery = la(customers.useSuggestForCustomerQuery);

export { useGetCustomerByIdQuery, useSuggestForCustomerQuery };
