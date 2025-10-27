import {
    INotificationFilter,
    INotificationShort,
} from "@/types/notification/notification";
import IPage from "@/types/page";
import { ContactNotificationExtended } from "src/types/notification";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

interface INotificationFilterParams {
    filter: INotificationFilter;
    page: number;
    pageSize: number;
    sortBy: string;
    direction: string; // asc - desc
}

interface NotViewedContactNotifications {
    total: number;
    types: {
        [key: string]: number;
    };
}

export const notification = apiWithTranslation({
    reducerPath: "contactNotification",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/contact/notification`,
    }),
    tagTypes: ["Notifications", "NotificationById"],
    endpoints: (builder) => ({
        getNonViewedNotificationsCount: builder.query<
            NotViewedContactNotifications,
            void
        >({
            query: () => "non-viewed/count",
            providesTags: ["Notifications"],
        }),

        getNotificationById: builder.query<ContactNotificationExtended, number>(
            {
                query: (id) => `${id}`,
                providesTags: ["NotificationById"],
            }
        ),

        filterNotifications: builder.query<
            IPage<INotificationShort>,
            INotificationFilterParams
        >({
            query: ({ filter, ...params }) => ({
                url: "/filter",
                method: "POST",
                body: filter,
                params,
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

        activeAssignedTasksCount: builder.query<number, void>({
            query: () => `/active-assigned-tasks/count`,
        }),
    }),
});

export const {
    useGetNonViewedNotificationsCountQuery,
    useToggleNotificationViewedStatusMutation,
    useDeleteNotificationMutation,

    useActiveAssignedTasksCountQuery,
} = notification;

const useFilterNotificationsQuery = la(
    notification.useFilterNotificationsQuery
);
const useGetNotificationByIdQuery = la(
    notification.useGetNotificationByIdQuery
);

export { useFilterNotificationsQuery, useGetNotificationByIdQuery };
