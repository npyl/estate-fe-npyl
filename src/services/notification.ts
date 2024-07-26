import {
    INotificationFilter,
    INotificationResponse,
    NotViewedContactNotifications,
} from "@/types/notification/notification";
import IPage from "@/types/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ContactNotification,
    ContactNotificationExtended,
} from "src/types/notification";

interface INotificationFilterParams {
    filter: INotificationFilter;
    page: number;
    pageSize: number;
    sortBy: string;
    direction: string; // asc - desc
}

export const notification = createApi({
    reducerPath: "contactNotification",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/contact/notification`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

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
    tagTypes: ["Notifications", "NotificationById"],
    endpoints: (builder) => ({
        getNotifications: builder.query<ContactNotification[], void>({
            query: () => ({
                url: "",
            }),

            providesTags: ["Notifications"],
        }),
        getNonViewedNotificationsCount: builder.query<
            NotViewedContactNotifications,
            void
        >({
            query: () => ({
                url: "non-viewed/count",
            }),

            providesTags: ["Notifications"],
        }),

        getNotificationById: builder.query<ContactNotificationExtended, number>(
            {
                query: (id) => `${id}`,
                providesTags: ["NotificationById"],
            }
        ),

        filterNotifications: builder.query<
            IPage<INotificationResponse>,
            INotificationFilterParams
        >({
            query: ({ filter, page, pageSize, sortBy, direction }) => ({
                url: "/filter",
                method: "POST",
                body: filter,
                params: {
                    page,
                    pageSize,
                    sortBy,
                    direction,
                },
            }),
            providesTags: ["Notifications"],
        }),

        toggleNotificationViewedStatus: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}/toggle-viewed`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notifications"],
        }),

        deleteNotification: builder.mutation<
            ContactNotificationExtended,
            number
        >({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notifications"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useGetNotificationByIdQuery,
    useGetNonViewedNotificationsCountQuery,
    useFilterNotificationsQuery,
    useToggleNotificationViewedStatusMutation,
    useDeleteNotificationMutation,
} = notification;
