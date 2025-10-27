import { Role, RoleMini, RoleReq } from "@/types/roles";
import isFalsy from "@/utils/isFalsy";
import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

export const roles = createApi({
    reducerPath: "roles",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/roles`,
    }),
    tagTypes: ["Roles", "RoleById"],
    endpoints: (builder) => ({
        getAllRoles: builder.query<RoleMini[], void>({
            query: () => "/",
            providesTags: ["Roles"],
        }),

        getRoleById: builder.query<Role, number>({
            query: (id) => `/${id}`,
            providesTags: ["RoleById"],
        }),

        createOrUpdateRole: builder.mutation<RoleMini, RoleReq>({
            query: ({ id, ...body }) => ({
                url: isFalsy(id) ? "" : `/${id}`,
                method: isFalsy(id) ? "POST" : "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
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

export const {
    useGetAllRolesQuery,
    useGetRoleByIdQuery,
    useCreateOrUpdateRoleMutation,
} = roles;
