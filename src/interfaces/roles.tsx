export interface IPreset {
    id: number;
    details: IRoles[];
    name: string;
}

export interface IRolesReq {
    details: IRoles[];
    preset?: number;
    source: string;
    target: string[];
}

export interface IRoles {
    parentCategory: string;
    category: string;
    subcategory: string;
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
