import {
    ICreateOrUpdateTaskReq,
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanComment,
    IKanbanCommentPOST,
} from ".";
import { CalendarEventReq } from "@/types/calendar";

const IKanbanCommentResToReq = ({
    id,
    creator,
    message,
}: IKanbanComment): IKanbanCommentPOST => ({
    id,
    creatorId: creator?.id,
    message,
});

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
        comments: comments?.map(IKanbanCommentResToReq) || [],
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
    id,
    name,
    description,
    due,
    eventId,
}: IKanbanCardPOST): CalendarEventReq => ({
    id: eventId,
    title: name,
    description: description || "",
    type: "TASK",
    startDate: due?.[0] || "",
    endDate: due?.[1] || "",
    location: "",
    withIds: [],
});

export { IKanbanCardRes2Req, KanbanTaskToCalendarEvent };
