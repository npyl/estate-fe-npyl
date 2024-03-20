import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserPOST } from "src/types/user";

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
    tagTypes: ["Users", "Profile", "UserActive"],
    endpoints: (builder) => ({
        profile: builder.query<IUser, void>({
            query: () => ({
                url: "profile/",
            }),
            providesTags: ["Profile"],
        }),
        addUser: builder.mutation<
            void,
            { user: IUserPOST; profilePhoto?: File }
        >({
            query: ({ user, profilePhoto }) => ({
                url: "/add",
                method: "POST",
                body: user,
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
    useProfileQuery,
    useAddUserMutation,
    useAllUsersQuery,
    useToggleActiveUserMutation,
    useLazyIsAdminQuery,
    useLazyProfileQuery,
    useDeleteUserMutation,
    useResetPasswordMutation,
} = user;
