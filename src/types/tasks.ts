import { CalendarEventReq } from "./calendar";
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
    due: string[];
    attachments: string[];
    comments: IKanbanComment[];
    completed: boolean;
    createdAt: string;

    assignee: IUser;
    propertyId: number;
    customerId: number;
    reporterId: number;

    eventId: string; // INFO: Calendar Event Id -> Google Calendar Event Id
};

export type IKanbanCardPOST = Omit<IKanbanCard, "id" | "assignee"> & {
    id?: number;
    columnId: number;
    assigneeId: number;
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

const IKanbanCardRes2Req = (task: IKanbanCard | undefined): IKanbanCardPOST => {
    const {
        id,
        priority,
        name,
        description,
        due,
        attachments,
        comments,
        completed,
        createdAt,
        propertyId,
        customerId,
        eventId,
        reporterId,
        assignee,
    } = task || { assignee: {} };

    return {
        id: id || -1,
        priority: priority || 0,
        name: name || "",
        description: description || "",
        due: due || ["", ""],
        attachments: attachments || [],
        comments: comments || [],
        completed: completed || false,
        createdAt: createdAt || "",
        propertyId: propertyId || -1,
        customerId: customerId || -1,
        assigneeId: assignee?.id || -1,
        eventId: eventId || "",
        reporterId: reporterId || -1,
        columnId: -1,
    };
};

const KanbanTaskToCalendarEvent = ({
    name,
    description,
    due,
}: IKanbanCardPOST): CalendarEventReq => ({
    title: name,
    description,
    type: "TASK",
    startDate: due[0],
    endDate: due[1],
    location: "",
    withIds: [],
});

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent };
