import { ICreateOrUpdateTaskReq, IKanbanCard, IKanbanCardPOST } from ".";
import { CalendarEventReq } from "@/types/calendar";

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
