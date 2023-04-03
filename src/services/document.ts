import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const document = createApi({
  reducerPath: "document",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api",
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
    downloadDoc: builder.query<any, number>({
      query: (id) => ({
        url: `documents/download/file/${id}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useDownloadDocQuery } = document;
