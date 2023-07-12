import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDemand } from "src/types/customer";
import { IProperties, IPropertiesPostRequest, IPropertyFilter } from "src/types/properties";

import IPage from "src/types/page";

interface ICreatePropertyParams {
  parentCategory: string;
  category: string;
}
interface IEditPropertyProps {
  id: number;
  body: IPropertiesPostRequest;
}
interface ISuggestPropertiesProps {
  id: number;
  dataToSend: IDemand;
}
interface IPropertyFilterParams {
  filter: IPropertyFilter;
  page: number;
  pageSize: number;
}
interface IPropertySearchParams {
  searchString: string;
  page: number;
  pageSize: number;
}

export const properties = createApi({
  reducerPath: "properties",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/property`,
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),
  tagTypes: ["Properties", "PropertyById", "FilterProperties", "SuggestedProperties"],
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
    getPropertyByCode: builder.query<IProperties, number>({
      query: (code: number) => `code/${code}`,
      providesTags: ["Properties"],
    }),
    // TODO: remove
    addProperty: builder.mutation<any, any>({
      query: (dataToSend: any) => ({
        url: "",
        method: "POST",
        body: dataToSend,
      }),
    }),
    editProperty: builder.mutation<number, IEditPropertyProps>({
      query: (props: IEditPropertyProps) => ({
        url: `/edit/${props.id}`,
        method: "POST",
        body: props.body
      }),
    }),
    createProperty: builder.mutation<number, ICreatePropertyParams>({
      query: (dataToSend: ICreatePropertyParams) => ({
        url: "/create",
        method: "POST",
        params: dataToSend
      }),
    }),
    filterProperties: builder.mutation<IPage<IProperties>, IPropertyFilterParams>({
      query: (filterParam: IPropertyFilterParams) => ({
        url: "/filter",
        method: "POST",
        body: filterParam.filter,
        params: { page: filterParam.page, pageSize: filterParam.pageSize }
      }),
      invalidatesTags: ["Properties"],
    }),
    suggestForCustomer: builder.query<IProperties[], number>({
      query: (id: number) => ({
        url: '/customerSuggest',
        params: { customerId: id }
      }),
      providesTags: ["SuggestedProperties"],
    }),
    deleteProperty: builder.mutation<IProperties, number>({
      query: (id: number) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
    getSearchResults: builder.query<IPage<IProperties>, IPropertySearchParams>({
      query: (searchParams: IPropertySearchParams) => {
        return {
          url: "/search",
          params: searchParams,
        };
      },
    }),
    CustomerPropertySuggestions: builder.mutation<
      IProperties[],
      ISuggestPropertiesProps
    >({
      query: (data: ISuggestPropertiesProps) => ({
        url: `${data.id}/suggestProperties`,
        method: "POST",
        body: data.dataToSend,
      }),
      invalidatesTags: ["Properties"],
    }),
  }),
});

export const {
  useCustomerPropertySuggestionsMutation,
  useGetSearchResultsQuery,
  useAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useGetPropertyByCodeQuery,
  useAddPropertyMutation,   // TODO: remove
  useEditPropertyMutation,
  useCreatePropertyMutation,
  useDeletePropertyMutation,
  useFilterPropertiesMutation,
  useSuggestForCustomerQuery,
} = properties;
