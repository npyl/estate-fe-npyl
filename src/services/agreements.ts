import {
    IAgreement,
    IAgreementReq,
    IAgreementsFilters,
    IAgreementShort,
} from "@/types/agreements";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IAgreementSearchParams {
    search: string;
    page: number;
    pageSize: number;
}

export const agreements = createApi({
    reducerPath: "agreements",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/agreements`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );

            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );

            return headers;
        },
    }),

    tagTypes: ["Agreements", "AgreementById"],

    endpoints: (builder) => ({
        filterAgreements: builder.query<
            IPage<IAgreementShort>,
            IAgreementsFilters
        >({
            query: (body) => ({
                url: "/filter",
                method: "POST",
                body,
            }),
            providesTags: ["Agreements"],
        }),
        searchAgreements: builder.query<
            IPage<IAgreementShort>,
            IAgreementSearchParams
        >({
            query: (params) => ({
                url: "/search",
                method: "POST",
                params,
            }),
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
            query: ({ id, ...body }) => ({
                url: `${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Agreements", "AgreementById"],
        }),
        deleteAgreement: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Agreements"],
        }),
    }),
});

export const {
    useFilterAgreementsQuery,
    useSearchAgreementsQuery,
    useGetAgreementByIdQuery,
    useCreateAgreementMutation,
    useUpdateAgreementMutation,
    useDeleteAgreementMutation,

    useLazyGetAgreementByIdQuery,
} = agreements;
