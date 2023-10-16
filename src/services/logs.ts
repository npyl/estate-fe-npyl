import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICustomer } from "src/types/customer";
import { ILabel } from "src/types/label";
import { ILog } from "src/types/logs";
import IPage from "src/types/page";
import { IProperties } from "src/types/properties";

interface ILogsParams {
    id?: number;
    page: number;
    pageSize: number;
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
            }),
            providesTags: ["CustomerByIdLogs"],
        }),
        propertyHistoryPaginated: builder.query<IPage<ILog>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: `/property/${params.id}`,
                params: params,
            }),
            providesTags: ["PropertyByIdLogs"],
        }),
    }),
});

export const {
    useAdminLogsPaginatedQuery,
    useCustomerHistoryPaginatedQuery,
    useLazyPropertyHistoryPaginatedQuery,
} = logs;
