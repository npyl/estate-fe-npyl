import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthReq, UserResponse } from "src/interfaces/auth";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api",
      "http://localhost:8080/api",
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
