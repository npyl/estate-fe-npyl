import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICustomer } from "src/types/customer";

export const customers = createApi({
  reducerPath: "customers",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      "http://localhost:8080/api/customers",
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
        url: "",
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
