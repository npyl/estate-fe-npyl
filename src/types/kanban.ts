// ----------------------------------------------------------------------

export type IKanbanComment = {
    id: string;
    avatar: string;
    name: string;
    createdAt: string;
    messageType: "image" | "text";
    message: string;
};

export type IKanbanAssignee = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    address: string;
    phone: string;
    email: string;
    lastActivity: string;
    status: string;
    role: string;
};

export type IKanbanCard = {
    id: number;
    priority: number;
    name: string;
    description: string;
    assignee: IKanbanAssignee[];
    due: string[];
    attachments: string[];
    comments: IKanbanComment[];
    completed: boolean;
};
export type IKanbanCardPOST = Partial<IKanbanCard> & {
    columnId: number;
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
