import { getAccessToken } from "@/contexts/tokens";
import { RoleMini, RoleReq } from "@/types/roles";
import isFalsy from "@/utils/isFalsy";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roles = createApi({
    reducerPath: "roles",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/roles`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            headers.set("Authorization", `Bearer ${getAccessToken()}`);
            return headers;
        },
    }),
    tagTypes: ["Roles", "RoleById"],
    endpoints: (builder) => ({
        getAllRoles: builder.query<RoleMini[], void>({
            query: () => "/",
            providesTags: ["Roles"],
        }),

        createOrUpdateRole: builder.mutation<RoleMini, RoleReq>({
            query: ({ id, ...body }) => ({
                url: isFalsy(id) ? "" : `/${id}`,
                method: isFalsy(id) ? "POST" : "PUT",
                body: JSON.stringify(body),
            }),
            invalidatesTags: ["Roles", "RoleById"],
        }),

        deleteRole: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Roles", "RoleById"],
        }),
    }),
});

export const { useGetAllRolesQuery, useCreateOrUpdateRoleMutation } = roles;
