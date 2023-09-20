export interface IPreset {
    id: number;
    details: IDetails[]
};

export interface IDetails {
    state: string;
    category: string;
    subcategory: string;
    actions: {
        allowDelete: boolean;
        allowEdit: boolean;
        accessOwner: boolean;
        accessLocation: boolean;
        accessPrice: boolean;
        accessActive: boolean;
        accessHidden: boolean;
        accessInactive: boolean;
    };
};
