import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserPOST } from "src/types/user";

interface UploadAvatarReq {
    userId: number;
    file: File;
}

export const user = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
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
            invalidatesTags: ["Users"],
        }),
        allUsers: builder.query<IUser[], void>({
            query: () => ({
                url: "",
            }),
            providesTags: ["Users"],
        }),

        toggleActiveUser: builder.mutation<IUser[], number>({
            query: (userId: number) => ({
                url: `toggleActive/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        toggleActiveNotification: builder.mutation<IUser[], number>({
            query: (userId: number) => ({
                url: `toggle-notification-view/${userId}`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
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
        resetPassword: builder.mutation<
            void,
            { userId: number; newPassword: string }
        >({
            query: ({ userId, newPassword }) => ({
                url: "reset-password",
                method: "PATCH",
                body: {
                    userId,
                    newPassword,
                },
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetUserQuery,
    useAllUsersQuery,
    // ...
    useUploadAvatarMutation,
    useRemoveAvatarMutation,
    // ...
    useAddUserMutation,
    useToggleActiveUserMutation,
    useToggleActiveNotificationMutation,
    useLazyIsAdminQuery,
    useLazyGetProfileQuery,
    useDeleteUserMutation,
    useResetPasswordMutation,
} = user;
