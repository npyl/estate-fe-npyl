import { IFirm, IFirmReq, IFirmFilter } from "@/types/firm";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IFirmFitlerReq {
    body: IFirmFilter;
    page: number;
    pageSize: number;
}

type IFirmFitlerRes = IPage<IFirm>;

export const firm = createApi({
    reducerPath: "firm",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/firm",
    }),

    tagTypes: ["Firms"],

    endpoints: (builder) => ({
        createOrUpdateFirm: builder.mutation<number, IFirmReq>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Firms"],
        }),

        filterFirms: builder.query<IFirmFitlerRes, IFirmFitlerReq>({
            query: ({ body, page, pageSize }) => ({
                url: "/filter",
                method: "POST",
                body,
                params: {
                    page,
                    pageSize,
                },
            }),
            providesTags: ["Firms"],
        }),

        allFirms: builder.query<IFirm[], void>({
            query: () => "/all",
            providesTags: ["Firms"],
        }),
    }),
});

export const {
    useCreateOrUpdateFirmMutation,
    useFilterFirmsQuery,
    useAllFirmsQuery,
} = firm;
