import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    ContactNotification,
    ContactNotificationExtended,
} from "src/types/notification";

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
        getNotificationById: builder.query<ContactNotificationExtended, number>(
            {
                query: (id) => `${id}`,
                providesTags: ["NotificationById"],
            }
        ),
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
    useDeleteNotificationMutation,
} = notification;
