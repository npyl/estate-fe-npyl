import { TCalendarEvent } from "@/components/Calendar/types";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserId = number;

export const calendar = createApi({
    reducerPath: "calendar",
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/calendar`,
    }),

    tagTypes: ["IsAuthenticated", "Events"],

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

        // ------------------------- EVENTS ---------------------------

        getAllEvents: builder.query<TCalendarEvent[], UserId>({
            query: (userId) => ({
                url: `/${userId}/events/all`,
            }),
            providesTags: ["Events"],
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useAuthenticateMutation,
    // ...
    useGetAllEventsQuery,
} = calendar;
