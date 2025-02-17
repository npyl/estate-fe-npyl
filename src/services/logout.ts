import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logout = createApi({
    reducerPath: "logout",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => "",
        }),
    }),
});

export const { useLogoutMutation } = logout;
