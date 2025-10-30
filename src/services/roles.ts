import { Role, RoleMini, RoleReq } from "@/types/roles";
import isFalsy from "@/utils/isFalsy";
import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";
import { user } from "@/services/user";

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
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            // INFO: also invalidate tags for users because each has the `assignedRoles` field
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(user.util.invalidateTags(["Users"]));
            },
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
    useDeleteRoleMutation,
} = roles;
