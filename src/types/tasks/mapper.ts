import { ICreateOrUpdateTaskReq, IKanbanCard, IKanbanCardPOST } from ".";
import { CalendarEventReq } from "@/types/calendar";

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
    } = task || { assignee: {} };

    console.log("EVENT: ", event);

    return {
        id: id || -1,
        priority: priority || 0,
        name: name || "",
        description: description || "",
        due,
        attachments: [],
        properties: properties?.map(getId) || [],
        customers: customers?.map(getId) || [],
        userIds: assignees?.map(getId) || [],
        columnId: -1,
        event: event || "",
        withCalendar: Boolean(event),
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
});

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent };
