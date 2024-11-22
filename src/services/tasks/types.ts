import { BoardFiltersReq, IKanbanCommentPOST } from "@/types/tasks";

interface WithFilters {
    filters?: BoardFiltersReq;
}

interface DeleteColumnReq extends WithFilters {
    columnId: number;
}

interface ReorderColumnProps extends WithFilters {
    columnId: number;
    position: number;
}

interface MoveCardProps extends WithFilters {
    cardId: number;
    srcColumnId: number;
    dstColumnId: number;
    position: number; // INFO: inside dst column
}
interface ReorderCardProps extends WithFilters {
    cardId: number;
    columnId: number;
    position: number;
}

interface ICreateCommentReq {
    cardId: number;
    body: IKanbanCommentPOST;
}

interface DeleteCardReq extends WithFilters {
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
