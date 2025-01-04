import { TCalendarEvent } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { GUserMini } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "@/services/google-oauth";
import {
    CreateUpdateEventReq,
    DeleteEventReq,
    GetEventsReq,
    IsAdminRes,
    SearchEventsReq,
} from "./types";
import { optimisticDelete, optimisticUpdate } from "./optimistic";

export const calendar = createApi({
    reducerPath: "calendar",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_PROXY_API}/calendar`,
    }),

    tagTypes: ["IsAdmin", "Events", "Users"],

    endpoints: (builder) => ({
        // ------------------------- OFFICE ---------------------------

        isAdmin: builder.query<IsAdminRes, number>({
            query: (userId) => ({
                url: `/${userId}/office/isAdmin`,
            }),
            providesTags: ["IsAdmin"],
        }),

        getUsers: builder.query<GUserMini[], number>({
            query: (userId) => ({
                url: `/${userId}/office/users`,
            }),
            providesTags: ["Users"],
        }),

        // ------------------------- EVENTS ---------------------------

        getEvents: builder.query<TCalendarEvent[], GetEventsReq>({
            query: ({ userId, startDate, endDate, filters }) => ({
                url: `/${userId}/events/get`,
                params: {
                    startDate,
                    endDate,
                    calendarId: filters?.calendarId,
                },
            }),
            providesTags: ["Events"],
        }),

        searchEvents: builder.query<TCalendarEvent[], SearchEventsReq>({
            query: ({ userId, query, startDate, endDate, filters }) => ({
                url: `/${userId}/events/search`,
                params: {
                    startDate,
                    endDate,
                    query,
                    calendarId: filters?.calendarId,
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
            onQueryStarted: optimisticUpdate,
            invalidatesTags: ["Events"],
        }),

        deleteEvent: builder.mutation<void, DeleteEventReq>({
            query: ({ userId, eventId }) => ({
                url: `/${userId}/events/${eventId}`,
                method: "DELETE",
            }),
            onQueryStarted: optimisticDelete,
            invalidatesTags: ["Events"],
        }),
    }),
});

const useCalendarAuth = () => {
    const { user } = useAuth();

    const { data, isLoading } = useIsAuthenticatedQuery(user?.id!, {
        skip: !user?.id,
    });

    const [authenticateCb] = useAuthenticateMutation();

    const isAuthenticated = data?.isAuthenticated;

    const authenticate = async () => {
        await authenticateCb(user!.id);
    };

    return {
        isAuthenticated,
        userInfo: data?.userInfo,
        authenticate,
        isLoading,
    };
};

export { useCalendarAuth };

export const {
    // ...
    useIsAdminQuery,
    useGetUsersQuery,
    // ...
    useGetEventsQuery,
    useSearchEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
} = calendar;
