import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "src/types/user";

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
		profile: builder.query<IUser, any>({
			query: () => ({
				url: "profile/",
			}),
			providesTags: ["Profile"],
		}),
		updateProfile: builder.mutation<any, any>({
			query: (data) => ({
				url: "",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Profile"],
		}),
		allUsers: builder.query<IUser[], void>({
			query: () => ({
				url: "",
			}),
			providesTags: ["Users"],
		}),
	}),
});

export const { useProfileQuery, useUpdateProfileMutation, useAllUsersQuery } =
	user;
