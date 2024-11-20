import { TCalendarEvent } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { CalendarEventReq } from "@/types/calendar";
import { GUserMini } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useTranslation } from "react-i18next";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "./google-oauth";

interface EventFilters {
    calendarId?: string;
}

interface BasicEventReq {
    userId: number;
}

interface GetEventsReq extends BasicEventReq {
    startDate: string;
    endDate: string;
    filters?: Partial<EventFilters>;
}

interface SearchEventsReq extends BasicEventReq {
    query: string;
    startDate?: string;
    endDate?: string;
    filters?: Partial<EventFilters>;
}

interface DeleteEventReq extends BasicEventReq {
    eventId: string;
}

interface CreateUpdateEventReq extends BasicEventReq {
    body: CalendarEventReq;
}

interface IsAdminRes {
    isAdmin: boolean;
    user?: GUserMini;
}

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

const useCalendarAuth = () => {
    const { t } = useTranslation();

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
