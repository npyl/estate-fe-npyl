import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompany, ICompanyPOST } from "src/types/company";

export const company = createApi({
    reducerPath: "company",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/company`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),
    tagTypes: ["Company"],
    endpoints: (builder) => ({
        getCompanyDetails: builder.query<ICompany, void>({
            query: () => ({
                url: "/details",
            }),
            providesTags: ["Company"],
        }),
        updateCompanyDetails: builder.mutation<void, ICompanyPOST>({
            query: (data) => ({
                url: "/details",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Company"],
        }),
    }),
});

export const { useGetCompanyDetailsQuery, useUpdateCompanyDetailsMutation } =
    company;
