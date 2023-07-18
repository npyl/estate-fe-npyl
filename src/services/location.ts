import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGeoLocation } from "src/types/geolocation";

interface IGetClosestParams {
	longitude: number;
	latitude: number;
}

export const location = createApi({
	reducerPath: "location",
	baseQuery: fetchBaseQuery({
		baseUrl: `${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
		}/api/geography/hierarchy/`,
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
		getAreas: builder.query<IGeoLocation, number>({
			query: (parentID) => ({
				url: `${{ parentID }}`,
			}),
		}),
		getSubAreas: builder.mutation<IGeoLocation[], number[]>({
			query: (body: number[]) => ({
				url: "",
				method: "POST",
				body,
			}),
		}),
		getClosest: builder.query<IGeoLocation, IGetClosestParams>({
			query: (params: IGetClosestParams) => ({
				url: "/closest",
				params: params,
			}),
		}),
	}),
});

export const { useGetAreasQuery, useGetSubAreasMutation, useGetClosestQuery } =
	location;
