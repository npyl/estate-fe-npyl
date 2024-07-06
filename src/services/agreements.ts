import { IAgreement, IAgreementsFilters } from "@/types/agreements";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ${process.env.NEXT_PUBLIC_API_URL}
const baseUrl = "/api";

export const agreements = createApi({
    reducerPath: "agreements",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/agreements`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),

    tagTypes: ["Agreements", "AgreementById"],

    endpoints: (builder) => ({
        filterAgreements: builder.mutation<
            IPage<IAgreement>,
            IAgreementsFilters
        >({
            query: (body) => ({
                url: "/filter",
                method: "POST",
                body,
            }),
        }),
        getAgreementById: builder.query<IAgreement, number>({
            query: (id) => ({
                url: `/${id}`,
            }),
            providesTags: ["AgreementById"],
        }),
    }),
});

export const { useFilterAgreementsMutation, useGetAgreementByIdQuery } =
    agreements;
