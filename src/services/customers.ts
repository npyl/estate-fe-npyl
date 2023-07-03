import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICustomer, IDemand } from "src/types/customer";
import { IDemandPOST } from "src/types/demand";
import { IProperties } from "src/types/properties";

export const customers = createApi({
  reducerPath: "customers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/customers`,
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    allCustomers: builder.query<ICustomer[], void>({
      query: () => ({
        url: "all",
      }),
      providesTags: ["Customers"],
    }),
    getCustomerById: builder.query<ICustomer, number>({
      query: (id: number) => `${id}`,
      providesTags: ["Customers"],
    }),
    addCustomer: builder.mutation<ICustomer, any>({
      query: (dataToSend: any) => ({
        url: "",
        method: "POST",
        body: dataToSend,
      }),
      invalidatesTags: ["Customers"],
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
  useAddCustomerMutation,
  useDeleteCustomerMutation,
} = customers;
