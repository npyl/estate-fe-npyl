import { createApi } from "@reduxjs/toolkit/query/react";
import { IDashboard } from "src/types/dashboard";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

export const dashboard = createApi({
    reducerPath: "dashboard",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    }),
    endpoints: (builder) => ({
        getDashboard: builder.query<IDashboard, void>({
            query: () => "",
        }),
    }),
});

export const { useGetDashboardQuery } = dashboard;
