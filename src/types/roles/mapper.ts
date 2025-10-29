import {
    Role,
    RolePropertyPermissions,
    RolePropertyPermissionsReq,
    RoleReq,
} from "./base";
import { KeyValue } from "@/types/KeyValue";
import { IUserMini } from "@/types/user";

const getKey = ({ key }: KeyValue) => key;
const getId = ({ id }: IUserMini) => id;

const RolePropertyPermissionsToReq = (
    p?: RolePropertyPermissions
): RolePropertyPermissionsReq => ({
    view: p?.view ?? false,
    edit: p?.edit ?? false,
    delete: p?.delete ?? false,
    // ...
    allStates: p?.allStates ?? true,
    states: p?.states?.map(getKey) ?? [],
    // ...
    allParentCategories: p?.allParentCategories ?? true,
    parentCategories: p?.parentCategories?.map(getKey) ?? [],
    // ...
    allCategories: p?.allCategories ?? true,
    categories: p?.categories?.map(getKey) ?? [],
    // ...
    allUsers: p?.allUsers ?? false,
    users: p?.users?.map(getId) ?? [],
});

const RoleToRoleReq = (data?: Role): RoleReq => ({
    id: data?.id,
    name: data?.name || "",
    color: data?.color || "",
    description: data?.description || "",
    propertyPermissions: RolePropertyPermissionsToReq(
        data?.propertyPermissions
    ),
    users: [],
});

export { RoleToRoleReq, RolePropertyPermissionsToReq };
