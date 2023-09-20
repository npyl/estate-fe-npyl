import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "src/types/user";
import {IDetails, IPreset} from "../interfaces/roles";

export const security = createApi({
    reducerPath: "security",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/permissions`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),
    tagTypes: ["Presets"],
    endpoints: (builder) => ({

        // get
        getPresets: builder.query<IPreset, any>({
            query: () => ({
                url: "presets",
            }),
            providesTags: ["Presets"],
        }),

        //post,put...
        savePreset: builder.mutation<any, IPreset>({
            query: (data) => ({
                url: "presets",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Presets"],
        }),

    }),
});

export const { useGetPresetsQuery, useSavePresetMutation } =
    security;

