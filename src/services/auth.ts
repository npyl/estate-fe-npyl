import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthReq, UserResponse } from "src/interfaces/auth";

export const auth = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, IAuthReq>({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),

        register: builder.mutation<any, IAuthReq>({
            query: (credentials) => ({
                url: "register",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = auth;
