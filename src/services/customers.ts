import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICustomer,
    ICustomerFilter,
    ICustomerPOST,
    ICustomerResultResponse,
} from "src/types/customer";
import { ILabel } from "src/types/label";
import IPage from "src/types/page";

export interface BulkEditRequest {
    customerIds: number[];
    managerId?: number;
    labels?: number[];
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

export const customers = createApi({
    reducerPath: "customers",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),
    tagTypes: ["Customers", "CustomerById", "CustomerByIdLabels"],

    endpoints: (builder) => ({
        allCustomers: builder.query<ICustomer[], void>({
            query: () => ({
                url: "all",
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

        createOrUpdateCustomer: builder.mutation<number, ICustomerPOST>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Customers", "CustomerById"],
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
    }),
});

export const {
    useAllCustomersQuery,
    useGetCustomerByIdQuery,
    useFilterCustomersQuery,
    useSearchCustomerQuery,
    useCreateOrUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useBulkEditCustomersMutation,
    useBulkDeleteCustomersMutation,
    useGetCustomerLabelsQuery,
    useLazyGetCustomerByIdQuery,
} = customers;
