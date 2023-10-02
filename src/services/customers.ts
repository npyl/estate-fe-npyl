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
}
interface IEditCustomerProps {
    customerId: number;
    body: ICustomerPOST;
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
    tagTypes: [
        "Customers",
        "CustomerById",

        // Attributes
        "CustomerByIdLabels",
    ],
    endpoints: (builder) => ({
        allCustomers: builder.query<ICustomer[], void>({
            query: () => ({
                url: "all",
            }),
            providesTags: ["Customers"],
        }),
        allCustomersPaginated: builder.query<IPage<ICustomer>, ICustomerParams>(
            {
                query: (params: ICustomerParams) => ({
                    url: "",
                    params: params,
                }),
                providesTags: ["Customers"],
            }
        ),
        getCustomerById: builder.query<ICustomer, number>({
            query: (id: number) => `${id}`,
            providesTags: ["CustomerById"],
        }),
        getCustomerLabels: builder.query<ILabel[], number>({
            query: (id: number) => `${id}/labels`,
            providesTags: ["CustomerByIdLabels"],
        }),
        filterCustomers: builder.mutation<
            IPage<ICustomerResultResponse>,
            ICustomerFilterProps
        >({
            query: (props: ICustomerFilterProps) => ({
                url: "/filter",
                method: "POST",
                body: props.filter,
                params: {
                    page: props.page,
                    pageSize: props.pageSize,
                },
            }),
            invalidatesTags: ["Customers"],
        }),

        createCustomer: builder.mutation<number, void>({
            query: () => ({
                url: "/create",
                method: "POST",
            }),
            invalidatesTags: ["Customers", "CustomerById"],
        }),
        editCustomer: builder.mutation<ICustomer, IEditCustomerProps>({
            query: (props: IEditCustomerProps) => ({
                url: `/edit/${props.customerId}`,
                method: "POST",
                body: props.body,
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
    useAllCustomersPaginatedQuery,
    useGetCustomerByIdQuery,
    useLazyGetCustomerLabelsQuery,
    useFilterCustomersMutation,
    useSearchCustomerQuery,

    useCreateCustomerMutation,
    useEditCustomerMutation,
    useDeleteCustomerMutation,
    useBulkEditCustomersMutation,
    useBulkDeleteCustomersMutation,
} = customers;
