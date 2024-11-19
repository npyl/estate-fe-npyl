import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IIsIntegratedRes {
    isIntegrated: boolean;
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
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),
    tagTypes: ["GoogleWorkspace"],
    endpoints: (builder) => ({
        isGoogleWorkspaceIntegrated: builder.query<boolean, void>({
            query: () => ({
                url: "",
            }),
            transformResponse: (response: IIsIntegratedRes) =>
                response.isIntegrated,
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
    }),
});

export const {
    useIsGoogleWorkspaceIntegratedQuery,
    useUpdateGoogleWorkspaceMutation,
} = googleWorkspaceApi;
