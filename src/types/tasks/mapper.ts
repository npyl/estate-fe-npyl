import { CALENDAR_COLOR_FALLBACK } from "@/components/Calendar/types";
import { ICreateOrUpdateTaskReq, IKanbanCard, IKanbanCardPOST } from ".";
import { CalendarEventReq } from "@/types/calendar";
import { getNotSelectedOption } from "@/constants/select";

type ObjectWithId = { id: number };

const getId = ({ id }: ObjectWithId) => id;

const IKanbanCardRes2Req = (
    task: IKanbanCard | undefined
): ICreateOrUpdateTaskReq => {
    const {
        id,
        priority,
        name,
        description,
        due, // INFO: we are ok with undefined when `withCalendar` is false
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
        due,
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

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent };
