import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logout = createApi({
    reducerPath: "logout",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({ url: "", method: "POST" }),
        }),
    }),
});

export const { useLogoutMutation } = logout;
