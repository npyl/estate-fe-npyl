import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserPOST } from "src/types/user";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";
import { TTaskVisibility } from "@/types/roles";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

interface UploadAvatarReq {
    userId: number;
    file: File;
}

interface IChatTokenRes {
    token: string;
}

interface ISetTaskViewReq {
    userId: number;
    visibility: TTaskVisibility;
}

interface IResetPasswordReq {
    userId: number;
    newPassword: string;
}

export const user = apiWithTranslation({
    reducerPath: "user",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    }),
    tagTypes: ["Users", "User", "UserActive"],
    endpoints: (builder) => ({
        getProfile: builder.query<IUser, void>({
            query: () => ({
                url: "profile/",
            }),
        }),
        getUser: builder.query<IUser, number>({
            query: (userId) => ({
                url: `/${userId}`,
            }),
            providesTags: ["User"],
        }),
        // ---------------------------------------------------------
        uploadAvatar: builder.mutation<string, UploadAvatarReq>({
            query: ({ file, userId }) => {
                const formData = new FormData();
                formData.append("file", file);

                return {
                    url: `${userId}/avatar`,
                    method: "POST",
                    body: formData,
                    responseHandler: "text",
                };
            },
            invalidatesTags: ["User", "Users"],
        }),
        removeAvatar: builder.mutation<void, number>({
            query: (userId) => ({
                url: `${userId}/avatar`,
                method: "DELETE",
                responseHandler: "text",
            }),
            invalidatesTags: ["User", "Users"],
        }),
        // ---------------------------------------------------------
        addUser: builder.mutation<void, IUserPOST>({
            query: (body) => ({
                url: "/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users", "User"],
        }),
        allUsers: builder.query<IUser[], void>({
            query: () => ({
                url: "",
            }),
            providesTags: ["Users"],
        }),

        isAdmin: builder.query<boolean, number>({
            query: (userId) => ({
                url: `${userId}/isAdmin`,
            }),
            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation<
            void,
            { userId: number; transferId: number | null }
        >({
            query: ({ userId, transferId }) => ({
                url: transferId
                    ? `${userId}?transferTo=${transferId}`
                    : `${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        resetPassword: builder.mutation<void, IResetPasswordReq>({
            query: (body) => ({
                url: "reset-password",
                method: "PATCH",
                body,
            }),
        }),

        // -------------------------------------------

        generateChatToken: builder.mutation<IChatTokenRes, string>({
            query: (accessToken) => ({
                url: "generate-chat-token",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),

        // ----------------------- PERMISSIONS ----------------------------

        toggleActiveUser: builder.mutation<IUser[], number>({
            query: (userId) => ({
                url: `toggleActive/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        toggleNotificationAccess: builder.mutation<void, number>({
            query: (userId) => ({
                url: `toggle-notification-view/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["User", "Users"],
        }),

        toggleAgreementsAccess: builder.mutation<void, number>({
            query: (userId) => ({
                url: `toggle-agreement-view/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["User", "Users"],
        }),

        toggleMessagesAccess: builder.mutation<void, number>({
            query: (userId) => ({
                url: `toggle-messaging-view/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["User", "Users"],
        }),

        setTaskView: builder.mutation<void, ISetTaskViewReq>({
            query: ({ userId, visibility }) => ({
                url: `change-task-view/${userId}`,
                method: "POST",
                params: {
                    visibility,
                },
            }),
            invalidatesTags: ["User", "Users"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useLazyGetUserQuery,
    // ...
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
    // ...
    useAddUserMutation,
    useLazyIsAdminQuery,
    useLazyGetProfileQuery,
    useDeleteUserMutation,
    useResetPasswordMutation,
    // ...
    useGenerateChatTokenMutation,
    // ...
    useToggleActiveUserMutation,
    useToggleNotificationAccessMutation,
    useToggleAgreementsAccessMutation,
    useToggleMessagesAccessMutation,
    useSetTaskViewMutation,
} = user;

const useGetProfileQuery = la(user.useGetProfileQuery);
const useAllUsersQuery = la(user.useAllUsersQuery);

export { useGetProfileQuery, useAllUsersQuery };
