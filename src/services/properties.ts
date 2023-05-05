import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProperties, IPropertyFilter } from "src/types/properties";

export const properties = createApi({
  reducerPath: "properties",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      "http://localhost:8080/api/property",
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),
  tagTypes: ["Properties", "PropertyById", "FilterProperties"],
  endpoints: (builder) => ({
    allProperties: builder.query<IProperties[], void>({
      query: () => ({
        url: "all",
      }),
      providesTags: ["Properties"],
    }),
    getPropertyById: builder.query<IProperties, number>({
      query: (id: number) => `${id}`,
      providesTags: ["PropertyById"],
    }),
    addProperty: builder.mutation<any, any>({
      query: (dataToSend: any) => ({
        url: "",
        method: "POST",
        body: dataToSend,
      }),
    }),
    filterProperties: builder.mutation<IProperties[], IPropertyFilter>({
      query: (filter: IPropertyFilter) => ({
        url: "/filter",
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["Properties"],
    }),
  }),
});

export const {
  useAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useAddPropertyMutation,
  useFilterPropertiesMutation,
} = properties;
