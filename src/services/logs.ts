import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILog, ILogFilterPOST } from "src/types/logs";
import IPage from "src/types/page";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";

export interface ILogsParams {
    id?: number;
    page: number;
    pageSize: number;
    language?: string;
}

interface ILogFilterProps extends ILogsParams {
    filter: ILogFilterPOST;
}

export const logs = apiWithTranslation({
    reducerPath: "logs",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/logs`,
    }),
    tagTypes: ["Logs", "CustomerByIdLogs", "PropertyByIdLogs"],

    endpoints: (builder) => ({
        customerHistoryPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: `/customer/${params.id}`,
                params,
            }),
            providesTags: ["CustomerByIdLogs"],
        }),
        propertyHistoryPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: `/property/${params.id}`,
                params,
            }),
            providesTags: ["PropertyByIdLogs"],
        }),
        filterLogs: builder.query<IPage<ILog>, ILogFilterProps>({
            query: ({ filter, page, pageSize }: ILogFilterProps) => ({
                url: "/filter",
                method: "POST",
                body: filter,
                params: {
                    page,
                    pageSize,
                },
            }),
            providesTags: ["Logs"],
        }),
    }),
});

const useFilterLogsQuery = la(logs.useFilterLogsQuery);
const usePropertyHistoryPaginatedQuery = la(
    logs.usePropertyHistoryPaginatedQuery
);
const useCustomerHistoryPaginatedQuery = la(
    logs.useCustomerHistoryPaginatedQuery
);

export {
    useFilterLogsQuery,
    usePropertyHistoryPaginatedQuery,
    useCustomerHistoryPaginatedQuery,
};
