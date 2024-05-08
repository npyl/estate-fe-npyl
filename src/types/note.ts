import { IUser } from "./user";

export interface INote {
    id: number;
    content: string;
    creator: IUser;
    createdAt: Date;
    updatedAt: Date;
}

export interface INotePOST {
    id?: number;
    content: string;
}
