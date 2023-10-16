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
    tagTypes: ["Users", "Profile"],
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
            query: ({ user, profilePhoto }) => {
                // Convert user object to JSON string
                const userJson = JSON.stringify(user);

                // Create a FormData instance to handle file uploads
                const formData = new FormData();
                formData.append("userForm", userJson);

                // If a profilePhoto is provided, append it to the FormData
                if (profilePhoto) {
                    formData.append("profilePhoto", profilePhoto);
                }

                return {
                    url: "/add",
                    method: "POST",
                    body: formData,
                    // This is important as we don't want to manually set a multipart content type with boundary
                    headers: {
                        "Content-Type": undefined,
                    },
                };
            },
            invalidatesTags: ["Users"],
        }),
        allUsers: builder.query<IUser[], void>({
            query: () => ({
                url: "",
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const { useProfileQuery, useAddUserMutation, useAllUsersQuery } = user;
