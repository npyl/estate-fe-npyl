import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILabels, ILabel } from "src/types/label";

interface ILabelForPropertyProps {
  propertyId: number;
  labelBody: ILabel;
}
interface ILabelForCustomerProps {
  customerId: number;
  labelBody: ILabel;
}

export const labels = createApi({
  reducerPath: "labels",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      "http://localhost:8080/api/labels",
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),
  tagTypes: ["Labels"],
  endpoints: (builder) => ({
    getLabels: builder.query<ILabels, void>({
      query: () => ({
        url: "",
      }),
      providesTags: ["Labels"],
    }),
    createLabelForProperty: builder.mutation<ILabels, ILabelForPropertyProps>({
      query: (data: ILabelForPropertyProps) => ({
        url: `property/${data.propertyId}`,
        method: "POST",
        body: data.labelBody,
      }),
      invalidatesTags: ["Labels"],
    }),
    createLabelForCustomer: builder.mutation<ILabels, ILabelForCustomerProps>({
      query: (data: ILabelForCustomerProps) => ({
        url: `customer/${data.customerId}`,
        method: "POST",
        body: data.labelBody,
      }),
      invalidatesTags: ["Labels"],
    }),
  }),
});

export const {
  useGetLabelsQuery,
  useCreateLabelForPropertyMutation,
  useCreateLabelForCustomerMutation,
} = labels;
