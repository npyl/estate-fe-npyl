import { KeyValue } from "./KeyValue";
import { IUserMini } from "./user";

interface RolePropertyPermissions {
    view: boolean;
    edit: boolean;
    delete: boolean;
    // ...
    allStates: boolean;
    states: KeyValue[];
    // ...
    allParentCategories: boolean;
    parentCategories: KeyValue[];
    // ...
    allCategories: boolean;
    categories: KeyValue[];
    // ...
    allUsers: false;
    users: IUserMini[];
}

interface RolePropertyPermissionsReq
    extends Omit<
        RolePropertyPermissions,
        "states" | "parentCategories" | "categories" | "users"
    > {
    states: string[];
    parentCategories: string[];
    categories: string[];
    users: number[];
}

interface Role {
    id: number;
    name: string;
    color: string;
    description: string;
    propertyPermissions: RolePropertyPermissions;
    assignedUsers: IUserMini[];
}

interface RoleReq
    extends Omit<Role, "id" | "propertyPermissions" | "assignedUsers"> {
    id?: number;
    propertyPermissions: RolePropertyPermissionsReq;
    users: number[];
}

interface RoleMini {
    id: number;
    name: string;
    color: string;
    description: string;
}

//
// Separate Permissions
//

type TTaskVisibility = "NONE" | "ALL" | "OWN";

export type {
    Role,
    RoleReq,
    RolePropertyPermissions,
    RolePropertyPermissionsReq,
    RoleMini,
    // ...
    TTaskVisibility,
};
