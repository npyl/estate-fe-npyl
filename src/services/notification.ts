import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	ContactNotification,
	ContactNotificationPOST,
} from "src/types/notification";

export const notification = createApi({
	reducerPath: "contactNotification",
	baseQuery: fetchBaseQuery({
		baseUrl: `${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
		}/api/contact/notification`,
	}),
	tagTypes: ["Notifications", "NotificationById"],
	endpoints: (builder) => ({
		getNotifications: builder.query<ContactNotification, void>({
			query: () => "",
			providesTags: ["Notifications"],
		}),
		getNotificationById: builder.query<ContactNotification, number>({
			query: (id: number) => `${id}`,
			providesTags: ["NotificationById"],
		}),
		addNotification: builder.mutation<
			ContactNotification,
			ContactNotificationPOST
		>({
			query: (body: ContactNotificationPOST) => ({
				url: "",
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Notifications", "NotificationById"],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useGetNotificationByIdQuery,
	useAddNotificationMutation,
} = notification;
