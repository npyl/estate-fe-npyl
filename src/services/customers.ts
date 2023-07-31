import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICustomer,
    ICustomerFilter,
    ICustomerResultResponse,
} from "src/types/customer";
import IPage from "src/types/page";

interface ICustomerParams {
    page: number;
    pageSize: number;
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
    tagTypes: ["Customers", "CustomerById"],
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

        addCustomer: builder.mutation<ICustomer, any>({
            query: (dataToSend: any) => ({
                url: "",
                method: "POST",
                body: dataToSend,
            }),
            invalidatesTags: ["Customers"],
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
    useFilterCustomersMutation,
    useSearchCustomerQuery,

    useAddCustomerMutation,
    useDeleteCustomerMutation,
} = customers;
