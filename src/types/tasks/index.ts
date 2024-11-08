import { IUser } from "@/types/user";

export interface BoardFiltersReq {
    search?: string;
    assigneeId?: number;
    priority?: number;
}

export type IKanbanComment = {
    id: number;
    avatar?: string;
    name?: string;
    createdAt?: string;
    messageType: "image" | "text";
    message: string;
};

export type IKanbanCommentPOST = Omit<IKanbanComment, "id"> & {
    id?: number;
};

export type IKanbanCard = {
    id: number;
    priority: number;
    name: string;
    description: string;
    due: [string, string];
    attachments: string[];
    comments: IKanbanComment[];
    completed: boolean;

    assignee: IUser;
    propertyId: number;
    customerId: number;
    reporterId: number;

    eventId: string; // INFO: Calendar Event Id -> Google Calendar Event Id

    createdAt: string;
    updatedAt: string;
};

// INFO: sent to Backend directly
export type IKanbanCardPOST = Omit<
    IKanbanCard,
    | "id"
    | "assignee"
    | "reporterId"
    | "description"
    | "due"
    | "comments"
    | "eventId"
    | "createdAt"
    | "updatedAt"
> & {
    id?: number;
    description?: string;
    columnId: number;
    assigneeId: number;
    eventId?: string;
    due?: [string, string];
    comments: IKanbanCommentPOST[];
};

// INFO: used in form
export interface ICreateOrUpdateTaskReq extends IKanbanCardPOST {
    reporterId: number;
    withCalendar: boolean;
}

export type IKanbanColumn = {
    id: number;
    name: string;
    cardIds: number[];
    cardOrder: number[];
};
export type IKanbanColumnPOST = Partial<IKanbanColumn>;

export type IKanbanBoard = {
    cards: IKanbanCard[];
    columns: IKanbanColumn[];
    columnOrder: number[];
};
