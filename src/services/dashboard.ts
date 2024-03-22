import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDashboard } from "src/types/dashboard";

export const dashboard = createApi({
    reducerPath: "dashboard",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );
            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getDashboard: builder.query<IDashboard, void>({
            query: () => "",
        }),
    }),
});

export const { useGetDashboardQuery } = dashboard;
