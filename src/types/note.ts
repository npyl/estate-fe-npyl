import { IUser } from "./user";

export interface INote {
    id: number;
    content: string;
    creator: IUser;

    propertyId?: number;
    propertyCode?: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface INotePOST {
    id?: number;
    content: string;
}
