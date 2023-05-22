import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGeoLocation } from "src/types/geolocation";

export const location = createApi({
  reducerPath: "location",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/geography/hierarchy/",
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getLocation: builder.query<IGeoLocation, number>({
      query: (parentID) => ({
        url: `${{ parentID }}`,
      }),
    }),
  }),
});

export const { useGetLocationQuery } = location;
