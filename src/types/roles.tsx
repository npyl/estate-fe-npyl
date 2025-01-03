export interface IPreset {
    id?: number | null;
    name: string;
    permissions?: IRoles[];
}

export interface IPresetReq {
    data: IPreset;
    method: string;
}

export interface ITargets {
    firstName: "string";
    id: 0;
    lastName: "string";
    profilePhoto: "string";
}

export interface IRolesReq {
    id?: number | null;
    permissionResponses: IRoles[];
    source: ITargets;
    target: ITargets;
}

export interface IRoles {
    state: string;
    parentCategory: string;
    category: string;
    actions: IActions;
}

export interface IActions {
    create: boolean;
    view: boolean;
    edit: boolean;
    delete: boolean;
    accessOwner: boolean;
    accessLocation: boolean;
    accessPrice: boolean;
    accessActive: boolean;
    accessHidden: boolean;
    accessInactive: boolean;
}
