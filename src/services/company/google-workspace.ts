import { getAccessToken } from "@/contexts/tokens";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IIsIntegratedRes {
    isIntegrated: boolean;
    domain: string;
}

export interface IGoogleWorkspaceIntegrationReq {
    clientId: string;
    clientSecret: string;
    domain: string;
}

const baseUrl = `${process.env.NEXT_PUBLIC_PROXY_API}/google/workspace`;

export const googleWorkspaceApi = createApi({
    reducerPath: "googleWorkspace",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${getAccessToken()}`);
            return headers;
        },
    }),
    tagTypes: ["GoogleWorkspace"],
    endpoints: (builder) => ({
        isGoogleWorkspaceIntegrated: builder.query<IIsIntegratedRes, void>({
            query: () => "",
            providesTags: ["GoogleWorkspace"],
        }),

        updateGoogleWorkspace: builder.mutation<
            void,
            IGoogleWorkspaceIntegrationReq
        >({
            query: (body) => ({
                url: "",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["GoogleWorkspace"],
        }),

        deleteGoogleWorkspace: builder.mutation<void, number>({
            query: (userId) => ({
                url: "",
                method: "DELETE",
                params: {
                    userId,
                },
            }),
            invalidatesTags: ["GoogleWorkspace"],
        }),
    }),
});

export const {
    useIsGoogleWorkspaceIntegratedQuery,
    useUpdateGoogleWorkspaceMutation,
    useDeleteGoogleWorkspaceMutation,
} = googleWorkspaceApi;
