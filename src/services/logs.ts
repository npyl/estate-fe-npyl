import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILog, ILogFilterPOST } from "src/types/logs";
import IPage from "src/types/page";

export interface ILogsParams {
    id?: number;
    page: number;
    pageSize: number;
}
interface ILogFilterProps extends ILogsParams {
    filter: ILogFilterPOST;
}
export const logs = createApi({
    reducerPath: "logs",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/logs`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),
    tagTypes: ["Logs", "CustomerByIdLogs", "PropertyByIdLogs"], //tags must be uniq
    endpoints: (builder) => ({
        adminLogsPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: "",
                params: params,
                headers: {
                    "Accept-Language": "en",
                },
            }),
            providesTags: ["Logs"],
        }),

        customerHistoryPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: `/customer/${params.id}`,
                params: params,
                headers: {
                    "Accept-Language": "en",
                },
            }),
            providesTags: ["CustomerByIdLogs"],
        }),
        propertyHistoryPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: `/property/${params.id}`,
                params: params,
                headers: {
                    "Accept-Language": "en",
                },
            }),
            providesTags: ["PropertyByIdLogs"],
        }),
        filterLogs: builder.mutation<IPage<ILog>, ILogFilterProps>({
            query: (props: ILogFilterProps) => ({
                url: "/filter",
                method: "POST",
                body: props.filter,
                params: {
                    page: props.page,
                    pageSize: props.pageSize,
                },
                headers: {
                    "Accept-Language": "en",
                },
            }),
            invalidatesTags: ["Logs"],
        }),
    }),
});

export const {
    useAdminLogsPaginatedQuery,
    useCustomerHistoryPaginatedQuery,
    usePropertyHistoryPaginatedQuery,
    useFilterLogsMutation,
} = logs;
