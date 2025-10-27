import { CALENDAR_COLOR_FALLBACK } from "@/components/Calendar/types";
import {
    ICreateOrUpdateTaskReq,
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanComment,
} from "@/types/tasks";
import { CalendarEventReq } from "@/types/calendar";
import { getNotSelectedOption } from "@/constants/select";
import { INote } from "../note";

type ObjectWithId = { id: number };

const getId = ({ id }: ObjectWithId) => id;

/**
 * INFO: Due to our new zod schema, validation has become stricter, so make sure this is actually valid
 */
const getValidDue = (due?: [string | undefined, string | undefined]) => {
    if (!due) return;
    if (!due?.at(0) || !due?.at(1)) return;
    if (due.length !== 2) return;
    return due;
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
        properties,
        customers,
        assignees,
        event,
        columnId,
    } = task || { assignee: {} };

    const userIds = assignees?.map(getId) || [];
    const oldUserId = userIds.length > 0 ? userIds[0] : undefined;

    return {
        id: id || -1,
        priority: priority || 0,
        name: name || "",
        description: description || "",
        due: getValidDue(due),
        attachments: [],
        properties: properties?.map(getId) || [],
        customers: customers?.map(getId) || [],
        userIds,
        columnId: columnId ?? getNotSelectedOption(),
        event: event || "",
        withCalendar: Boolean(event),
        labels: [],
        oldUserId,
    };
};

const KanbanTaskToCalendarEvent = ({
    name,
    description,
    due,
    event,
}: IKanbanCardPOST): CalendarEventReq => ({
    id: event,
    title: name,
    description: description || "",
    type: "TASK",
    startDate: due?.[0] || "",
    endDate: due?.[1] || "",
    location: "",
    people: [],
    colorId: CALENDAR_COLOR_FALLBACK,
});

const TaskCommentToNote = ({
    id,
    message,
    createdAt,
    updatedAt,
    creator,
}: IKanbanComment): INote => ({
    id,
    content: message,
    creator,
    createdAt,
    updatedAt,
});

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent, TaskCommentToNote };
