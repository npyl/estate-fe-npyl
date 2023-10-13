import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ICustomer,
    ICustomerFilter,
    ICustomerPOST,
    ICustomerResultResponse,
} from "src/types/customer";
import { ILabel } from "src/types/label";
import { ILogs } from "src/types/logs";
import IPage from "src/types/page";

interface ILogsParams {
    page: number;
    pageSize: number;
}
interface IEditCustomerProps {
    customerId: number;
    body: ICustomerPOST;
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
    tagTypes: ["Logs", "CustomerById"],
    endpoints: (builder) => ({
        getAdmitLogs: builder.query<ILogs[], void>({
            query: () => ({
                url: "all",
            }),
            providesTags: ["Logs"],
        }),
        admitLogsPaginated: builder.query<IPage<ILogs>, ILogsParams>({
            query: (params: ILogsParams) => ({
                url: "",
                params: params,
            }),
            providesTags: ["Logs"],
        }),
        // getCustomerById: builder.query<ICustomer, number>({
        //     query: (id: number) => `${id}`,
        //     providesTags: ["CustomerById"],
        // }),
    }),
});

export const {
    useGetAdmitLogsQuery,
    useAdmitLogsPaginatedQuery,
    // useGetCustomerByIdQuery,
} = logs;
