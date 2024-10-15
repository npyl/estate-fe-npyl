import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IsAuthenticatedRes {
    isAuthenticated: boolean;
}

type UserId = number;

export const calendar = createApi({
    reducerPath: "calendar",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/calendar`,
    }),

    tagTypes: ["IsAuthenticated"],

    endpoints: (builder) => ({
        isAuthenticated: builder.query<IsAuthenticatedRes, UserId>({
            query: (userId) => ({
                url: `/${userId}/auth`,
            }),
            providesTags: ["IsAuthenticated"],
        }),

        authenticate: builder.mutation<void, UserId>({
            query: (userId) => ({
                url: `/${userId}/auth`,
                method: "POST",
            }),

            invalidatesTags: ["IsAuthenticated"],
        }),
    }),
});

export const { useIsAuthenticatedQuery, useAuthenticateMutation } = calendar;
