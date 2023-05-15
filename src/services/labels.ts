import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LabelProps {
  id: number;
  name: "string";
}

interface ILabels {
  customerLabels: LabelProps[];
  propertyLabels: LabelProps[];
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
  }),
});

export const { useGetLabelsQuery } = labels;
