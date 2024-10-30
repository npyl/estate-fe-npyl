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

        authenticate: builder.mutation<boolean, number>({
            query: (userId) => ({
                url: `/${userId}/auth`,
                method: "POST",
            }),
            async transformResponse(response: { authUrl: string }) {
                if (!response.authUrl) return false;

                const width = 600;
                const height = 600;
                const left = (window.innerWidth - width) / 2 + window.screenX;
                const top = (window.innerHeight - height) / 2 + window.screenY;

                // Open popup with google's oauth
                window.open(
                    response.authUrl,
                    "Google Auth",
                    `width=${width},height=${height},left=${left},top=${top},popup=1`
                );

                // Wait for popup to post a message to our initial window
                try {
                    const success = await new Promise<boolean>(
                        (resolve, reject) => {
                            window.onmessage = (event: MessageEvent) => {
                                if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
                                    window.onmessage = null;
                                    resolve(true);
                                }
                                if (event.data.type === "GOOGLE_AUTH_ERROR") {
                                    window.onmessage = null;
                                    reject(new Error("Authentication failed"));
                                }
                            };
                        }
                    );

                    return success;
                } catch (error) {
                    return false;
                }
            },
            invalidatesTags: (result) =>
                result ? ["IsAuthenticated", "Events"] : [],
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
