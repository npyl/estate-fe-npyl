import {
    IAgreement,
    IAgreementReq,
    IAgreementsFilters,
    IAgreementShort,
} from "@/types/agreements";
import IPage from "@/types/page";
import {
    apiWithTranslation,
    createLanguageAwareHook as la,
    createRemoveTabAwareHook as rt,
} from "./_util";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

interface IAgreementSearchParams {
    search: string;
    page: number;
    pageSize: number;
}

export const agreements = apiWithTranslation({
    reducerPath: "agreements",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/agreements`,
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
    useCreateAgreementMutation,
    useUpdateAgreementMutation,

    useLazyGetAgreementByIdQuery,
} = agreements;

const useFilterAgreementsQuery = la(agreements.useFilterAgreementsQuery);
const useSearchAgreementsQuery = la(agreements.useSearchAgreementsQuery);
const useGetAgreementByIdQuery = la(agreements.useGetAgreementByIdQuery);

const useDeleteAgreementMutation = rt(agreements.useDeleteAgreementMutation);

export {
    useFilterAgreementsQuery,
    useSearchAgreementsQuery,
    useGetAgreementByIdQuery,
    // ...
    useDeleteAgreementMutation,
};
