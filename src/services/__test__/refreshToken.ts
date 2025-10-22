import { URL0, URL1, URL2 } from "@/sections/__test__/RefreshToken/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const refreshToken = createApi({
    reducerPath: "refreshToken",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (builder) => ({
        getData0: builder.query<void, void>({
            query: () => URL0,
        }),
        getData1: builder.query<void, void>({
            query: () => URL1,
        }),
        getData2: builder.query<void, void>({
            query: () => URL2,
        }),
    }),
});

export const { useGetData0Query, useGetData1Query, useGetData2Query } =
    refreshToken;
