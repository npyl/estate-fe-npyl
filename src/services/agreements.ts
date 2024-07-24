import {
    IAgreement,
    IAgreementReq,
    IAgreementsFilters,
} from "@/types/agreements";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agreements = createApi({
    reducerPath: "agreements",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/agreements`,
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
        filterAgreements: builder.query<IPage<IAgreement>, IAgreementsFilters>({
            query: (body) => ({
                url: "/filter",
                method: "POST",
                body,
            }),
            providesTags: ["Agreements"],
        }),
        getAgreementById: builder.query<IAgreement, number>({
            query: (id) => ({
                url: `/${id}`,
            }),
            providesTags: ["AgreementById"],
        }),
        createAgreement: builder.mutation<number, IAgreementReq>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Agreements"],
        }),
        updateAgreement: builder.mutation<number, IAgreementReq>({
            query: (body) => ({
                url: "",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Agreements", "AgreementById"],
        }),
        deleteAgreement: builder.mutation<void, number>({
            query: (body) => ({
                url: "",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Agreements", "AgreementById"],
        }),
    }),
});

export const {
    useFilterAgreementsQuery,
    useGetAgreementByIdQuery,
    useCreateAgreementMutation,
    useUpdateAgreementMutation,
    useDeleteAgreementMutation,
} = agreements;
