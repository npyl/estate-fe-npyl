import { ICreateOrUpdateTaskReq, IKanbanCardPOST } from "@/types/tasks";
import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../calendar/_service/CalendarService";
import { KanbanTaskToCalendarEvent } from "@/types/tasks/mapper";
import { TCalendarEventToGCalendarEvent } from "@/types/calendar/mapper";
import { toNumber } from "../../util";

// -----------------------------------------------------------------------

const baseUrl = `${process.env.BACKEND_API_URL}/kanban/card`;

const createOrUpdateTask = async (
    Authorization: string,
    body: IKanbanCardPOST
) => {
    const method = body.id ? "PUT" : "POST";

    const response = await fetch(baseUrl, {
        headers: {
            Authorization,
        },
        body: JSON.stringify(body),
        method,
    });

    if (!response.ok) throw new Error("Task: fail");
};

// -----------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumber(userId);

        if (req.method !== "POST") throw new Error("Bad method");

        const Authorization = req.headers.authorization;
        if (!Authorization) throw new Error("Invalid headers");

        const {
            withCalendar,
            event: _eventId,
            googleUserKey,
            ...task
        } = JSON.parse(req.body) as ICreateOrUpdateTaskReq;

        const isEdit = Boolean(_eventId);
        let taskBody = { ...task } as IKanbanCardPOST;

        // ------------------------------------------------
        //       0: (with create/edit calendar event)
        // ------------------------------------------------
        if (withCalendar) {
            const event = KanbanTaskToCalendarEvent(task);
            const gEvent = TCalendarEventToGCalendarEvent(event);

            console.log(
                "[WITH_CALENDAR]: ppUser: ",
                userId,
                " gwUser: ",
                googleUserKey
            );
            console.log("[WITH_CALENDAR]: isEdit: ", isEdit, " body: ", event);

            if (isEdit) {
                await calendarService.updateEvent(iUserId, gEvent);
            } else {
                const event = await calendarService.createEvent(
                    iUserId,
                    gEvent,
                    googleUserKey
                );
                if (!event) throw new Error("Some bad event id");

                taskBody = { ...taskBody, event };
            }
        }

        // -------------------------------------------------
        //        1:     Create/Update Task
        // -------------------------------------------------

        await createOrUpdateTask(Authorization, taskBody);

        res.status(200).json({});
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
