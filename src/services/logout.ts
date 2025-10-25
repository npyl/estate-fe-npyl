import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

export const logout = createApi({
    reducerPath: "logout",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
    }),
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({ url: "", method: "POST" }),
        }),
    }),
});

export const { useLogoutMutation } = logout;
