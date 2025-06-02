import { IKanbanCommentPOST } from "@/types/tasks";

interface DeleteColumnReq {
    columnId: number;
}

interface ReorderColumnProps {
    columnId: number;
    position: number;
}

interface MoveCardProps {
    cardId: number;
    srcColumnId: number;
    dstColumnId: number;
    position: number; // INFO: inside dst column
}
interface ReorderCardProps {
    cardId: number;
    columnId: number;
    position: number;
}

interface ICreateCommentReq {
    cardId: number;
    body: IKanbanCommentPOST;
}

interface DeleteCardReq {
    cardId: number;
}

interface IAddAttachmentReq {
    card?: number;
    contentType: string;
    filename: string;
    size: number;
}

interface IAddAttachmentRes {
    cdnUrl: string;
    contentType: string;
    filename: string;
    id: number;
    url: string;
}

export type {
    DeleteColumnReq,
    ReorderColumnProps,
    // ...
    MoveCardProps,
    ReorderCardProps,
    DeleteCardReq,
    // ...
    ICreateCommentReq,
    // ...
    IAddAttachmentReq,
    IAddAttachmentRes,
};
