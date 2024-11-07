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
    due: [string, string];
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

// INFO: sent to Backend directly
export type IKanbanCardPOST = Omit<
    IKanbanCard,
    | "id"
    | "assignee"
    | "createdAt"
    | "reporterId"
    | "description"
    | "due"
    | "comments"
    | "eventId"
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

const IKanbanCardRes2Req = (
    task: IKanbanCard | undefined
): ICreateOrUpdateTaskReq => {
    const {
        id,
        priority,
        name,
        description,
        due,
        attachments,
        comments,
        completed,
        propertyId,
        customerId,
        assignee,
        eventId,
    } = task || { assignee: {} };

    return {
        id: id || -1,
        priority: priority || 0,
        name: name || "",
        description: description || "",
        due: due,
        attachments: attachments || [],
        comments: comments || [],
        completed: completed || false,
        propertyId: propertyId || -1,
        customerId: customerId || -1,
        assigneeId: assignee?.id || -1,
        columnId: -1,
        reporterId: -1,
        eventId: eventId || "",
        withCalendar: Boolean(eventId),
    };
};

const KanbanTaskToCalendarEvent = ({
    name,
    description,
    due,
}: IKanbanCardPOST): CalendarEventReq => ({
    title: name,
    description: description || "",
    type: "TASK",
    startDate: due![0],
    endDate: due![1],
    location: "",
    withIds: [],
});

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent };
