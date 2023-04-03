import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProperties } from "src/types/properties";

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
  tagTypes: ["Properties"],
  endpoints: (builder) => ({
    allProperties: builder.query<IProperties[], void>({
      query: () => ({
        url: "all",
      }),
      providesTags: ["Properties"],
    }),
  }),
});

export const { useAllPropertiesQuery } = properties;
