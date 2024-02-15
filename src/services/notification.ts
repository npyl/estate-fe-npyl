import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactNotification } from "src/types/notification";

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

            return headers;
        },
    }),
    tagTypes: ["Notifications"],
    endpoints: (builder) => ({
        getNotifications: builder.query<ContactNotification[], void>({
            query: () => "",
            providesTags: ["Notifications"],
        }),
    }),
});

export const { useGetNotificationsQuery } = notification;
