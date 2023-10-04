import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPreset, IPresetReq, IRolesReq } from "../interfaces/roles";

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
    tagTypes: ["Presets", "Relationship", "PresetById"],
    endpoints: (builder) => ({
        // get
        getPresets: builder.query<IPreset[], void>({
            query: () => ({
                url: "presets",
            }),
            providesTags: ["Presets"],
        }),
        getPresetById: builder.query<IPreset, number>({
            query: (id) => ({
                url: `presets/${id}`,
            }),
            providesTags: ["PresetById"],
        }),
        getRelationship: builder.query<
            IRolesReq,
            { sourceUserId: number; targetUserId: number }
        >({
            query: ({ sourceUserId, targetUserId }) => ({
                url: `${sourceUserId}/relationship/${targetUserId}`,
            }),
            providesTags: ["Relationship"],
        }),
        savePreset: builder.mutation<any, IPresetReq>({
            query: (arg) => ({
                url: "presets",
                method: arg.method,
                body: arg.data,
            }),
            invalidatesTags: ["Presets", "PresetById"],
        }),

        saveRelationship: builder.mutation<any, IRolesReq>({
            query: (data) => ({
                url: "",
                method: "POST",
                body: {
                    id: data.id,
                    permissions: data.permissionResponses,
                    source: data.source.id,
                    target: data.target.id,
                },
            }),
            invalidatesTags: ["Relationship"],
        }),

        deletePreset: builder.mutation<any, number>({
            query: (id) => ({
                url: `presets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Presets"],
        }),
    }),
});

export const {
    useGetPresetsQuery,
    useSavePresetMutation,
    useGetRelationshipQuery,
    useSaveRelationshipMutation,
    useGetPresetByIdQuery,
    useDeletePresetMutation,
} = security;
