import { IUserMini } from "./user";

export interface INote {
    id: number;
    content: string;
    creator: IUserMini;

    propertyId?: number;
    propertyCode?: string;

    createdAt: string;
    updatedAt: string;
}

export interface INotePOST {
    id?: number;
    content: string;
}
