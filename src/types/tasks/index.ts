import { IUser } from "@/types/user";

export interface BoardFiltersReq {
    search?: string;
    assigneeId?: number;
    priority?: number;
}

export type IKanbanComment = {
    id: number;
    message: string;
    creator: {
        id: number;
        firstName: string;
        lastName: string;
        avatar: string;
    };
    createdAt: string;
};

export type IKanbanCommentPOST = Omit<
    IKanbanComment,
    "id" | "creator" | "createdAt"
> & {
    id?: number;
    creatorId: number;
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
export type IKanbanCardPOST = {
    id?: number;
    priority: number;
    name: string;
    description?: string;
    due?: [string, string];
    attachments: string[];
    comments: IKanbanCommentPOST[];
    completed: boolean;

    columnId: number;

    propertyId?: number;
    customerId?: number;
    eventId?: string;
    assigneeId: number;
};

// INFO: used in form
export interface ICreateOrUpdateTaskReq extends IKanbanCardPOST {
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
