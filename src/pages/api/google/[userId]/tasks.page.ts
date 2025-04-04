import { ICreateOrUpdateTaskReq, IKanbanCardPOST } from "@/types/tasks";
import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../calendar/_service/CalendarService";
import { KanbanTaskToCalendarEvent } from "@/types/tasks/mapper";
import { TCalendarEventToGCalendarEvent } from "@/types/calendar/mapper";
import toNumber from "@/utils/toNumber";
import { IUser } from "@/types/user";

// -----------------------------------------------------------------------

const tasksBaseUrl = `${process.env.BACKEND_API_URL}/kanban/card`;

const createOrUpdateTask = async (
    Authorization: string,
    body: IKanbanCardPOST
) => {
    const method = body.id && body.id > -1 ? "PUT" : "POST";

    const response = await fetch(tasksBaseUrl, {
        headers: {
            Authorization,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method,
    });

    if (!response.ok) throw await response.json();
};

// -----------------------------------------------------------------------

const userByIdUrl = `${process.env.BACKEND_API_URL}/users`;

const getGoogleUserKey = async (Authorization: string, ids?: number[]) => {
    const userId = Array.isArray(ids) ? ids[0] : undefined;
    if (!Boolean(userId)) return "";

    try {
        const res = await fetch(`${userByIdUrl}/${userId}`, {
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
            method: "GET",
        });

        if (!res.ok) throw await res.json();

        const data = (await res.json()) as IUser;
        if (!data && "workspaceEmail" in data) throw "Bad data";

        return data.workspaceEmail;
    } catch (ex) {
        console.log(ex);
        return "";
    }
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

        const parsedBody = JSON.parseSafe<ICreateOrUpdateTaskReq>(req.body);
        if (!parsedBody) throw new Error("Bad json body");
        const { withCalendar, oldUserId, ...task } = parsedBody;

        const _eventId = task.event;
        const isEdit = Boolean(_eventId);
        let taskBody = { ...task } as IKanbanCardPOST;

        // ------------------------------------------------
        //       0: (with create/edit calendar event)
        // ------------------------------------------------
        if (withCalendar) {
            // googleUserKey
            const googleUserKey = await getGoogleUserKey(
                Authorization,
                task?.userIds
            );
            if (!googleUserKey) throw new Error("Bad googleUserKey");

            const event = KanbanTaskToCalendarEvent(task);
            const gEvent = TCalendarEventToGCalendarEvent(event);

            if (isEdit) {
                // oldGoogleUserKey
                if (!Boolean(oldUserId)) throw "Bad oldUserId";
                const oldGoogleUserKey = await getGoogleUserKey(Authorization, [
                    oldUserId!,
                ]);
                if (!oldGoogleUserKey) throw "Did not find old google user key";

                // Body
                const updatableEvent = { ...gEvent, id: _eventId };

                await calendarService.updateEvent(
                    iUserId,
                    updatableEvent,
                    oldGoogleUserKey,
                    googleUserKey
                );
            } else {
                // INFO: `event` meaning eventId
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
