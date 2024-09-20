// ----------------------------------------------------------------------

import { IUser } from "./user";

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
    user: IUser[]; // assignees
    due: string[];
    attachments: string[];
    comments: IKanbanComment[];
    completed: boolean;
};
export type IKanbanCardPOST = Partial<Omit<IKanbanCard, "user">> & {
    columnId?: number;
    userIds?: number[];
};

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

// ----------------------------------------------------------------------

export type IKanbanState = {
    isLoading: boolean;
    error: Error | string | null;
    board: {
        cards: Record<string, IKanbanCard>;
        columns: Record<string, IKanbanColumn>;
        columnOrder: number[];
    };
};

// export type IKanbanCommentPOST = {
//     id?: number;
//     message: string;
//     messageType: string;
// };
