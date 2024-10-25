import { TCalendarEvent } from "@/components/Calendar/types";
import { CalendarEventReq } from "@/types/calendar";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserId = number;

interface BasicEventReq {
    userId: number;
}

interface GetEventsReq extends BasicEventReq {
    startDate: string;
    endDate: string;
}

interface SearchEventsReq extends BasicEventReq {
    query: string;
    startDate?: string;
    endDate?: string;
}

interface DeleteEventReq extends BasicEventReq {
    eventId: string;
}

interface CreateUpdateEventReq extends BasicEventReq {
    body: CalendarEventReq;
}

interface IAuthenticateRes {
    authUrl: string;
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

        authenticate: builder.mutation<IAuthenticateRes, UserId>({
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

            invalidatesTags: ["IsAuthenticated", "Events"],
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

        searchEvents: builder.query<TCalendarEvent[], SearchEventsReq>({
            query: ({ userId, query, startDate, endDate }) => ({
                url: `/${userId}/events/search`,
                params: {
                    startDate,
                    endDate,
                    query,
                },
            }),
            providesTags: ["Events"],
        }),

        createEvent: builder.mutation<void, CreateUpdateEventReq>({
            query: ({ userId, body }) => ({
                url: `/${userId}/events/create`,
                body,
                method: "POST",
            }),
            invalidatesTags: ["Events"],
        }),
        updateEvent: builder.mutation<void, CreateUpdateEventReq>({
            query: ({ userId, body }) => ({
                url: `/${userId}/events/update`,
                body,
                method: "PUT",
            }),
            invalidatesTags: ["Events"],
        }),

        deleteEvent: builder.mutation<TCalendarEvent[], DeleteEventReq>({
            query: ({ userId, eventId }) => ({
                url: `/${userId}/events/${eventId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Events"],
        }),
    }),
});

export const {
    useIsAuthenticatedQuery,
    useAuthenticateMutation,
    useLogoutMutation,
    // ...
    useGetEventsQuery,
    useSearchEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = calendar;
