import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDemand } from "src/types/customer";
import { IProperties, IPropertyFilter } from "src/types/properties";

import IPage from "src/types/page";

interface ISuggestPropertiesProps {
  id: number;
  dataToSend: IDemand;
}
interface IPropertyFilterParam {
  filter: IPropertyFilter;
  page: number;
  pageSize: number;
}

export const properties = createApi({
  reducerPath: "properties",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/property`,
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
    filterProperties: builder.mutation<IPage<IProperties>, IPropertyFilterParam>({
      query: (filterParam: IPropertyFilterParam) => ({
        url: "/filter",
        method: "POST",
        body: filterParam.filter,
        params: { page: filterParam.page, pageSize: filterParam.pageSize }
      }),
      invalidatesTags: ["Properties"],
    }),
    deleteProperty: builder.mutation<IProperties, number>({
      query: (id: number) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),
    getSearchResults: builder.query<IProperties[], string>({
      query: (text: string) => {
        return {
          url: "/search",
          params: { searchString: text },
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
  useAddPropertyMutation,
  useDeletePropertyMutation,
  useFilterPropertiesMutation,
} = properties;
