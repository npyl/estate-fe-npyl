import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGlobal } from "src/types/global";

export const global = createApi({
  reducerPath: "global",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      "http://localhost:8080/api/global",
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests

      headers.set(
        "Authorization",
        `Bearer  ${localStorage.getItem("accessToken")}`
      );

      return headers;
    },
  }),
  tagTypes: ["Global"],
  endpoints: (builder) => ({
    allPropertyGlobal: builder.query<IGlobal, void>({
      query: () => ({
        url: "",
      }),
      providesTags: ["Global"],
    }),
  }),
});

export const { useAllPropertyGlobalQuery } = global;