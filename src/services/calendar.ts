import { TCalendarEvent } from "@/components/Calendar/types";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserId = number;

interface GetEventsReq {
    userId: number;
    startDate: string;
    endDate: string;
}

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

        logout: builder.mutation<void, UserId>({
            query: (userId) => ({
                url: `/${userId}/auth`,
                method: "DELETE",
            }),

            invalidatesTags: ["IsAuthenticated"],
        }),

        // ------------------------- EVENTS ---------------------------

        getEvents: builder.query<TCalendarEvent[], GetEventsReq>({
            query: ({ userId, startDate, endDate }) => ({
                url: `/${userId}/events/get`,
                params: {
                    startDate,
                    endDate,
                },
            }),
            providesTags: ["Events"],
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useAuthenticateMutation,
    useLogoutMutation,
    // ...
    useGetEventsQuery,
} = calendar;
