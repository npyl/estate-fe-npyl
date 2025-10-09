import { IUserMini } from "@/types/user";

interface INote {
    id: number;
    content: string;
    creator: IUserMini;

    propertyId?: number;
    propertyCode?: string;

    createdAt: string;
    updatedAt: string;
}

interface INotePOST {
    id?: number;
    content: string;
}

interface AddNoteReq {
    id: number; // resourceId
    body: INotePOST;
}

export type { AddNoteReq, INote, INotePOST };
