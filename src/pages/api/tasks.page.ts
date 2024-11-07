import { ICreateOrUpdateTaskReq, IKanbanCardPOST } from "@/types/tasks";
import type { NextApiRequest, NextApiResponse } from "next/types";

// -----------------------------------------------------------------------

const baseUrl = `${process.env.BACKEND_URL}/kanban/card`;

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
        if (req.method !== "POST") throw new Error("Bad method");

        const Authorization = req.headers.authorization;
        if (!Authorization) throw new Error("Invalid headers");

        const {
            withCalendar,
            reporterId,
            eventId: _eventId,
            ...task
        } = req.body as ICreateOrUpdateTaskReq;

        // ------------------------------------------------
        //              edit calendar event
        // ------------------------------------------------
        if (withCalendar && _eventId) {
            createOrUpdateTask(Authorization, task);
        }
        // ------------------------------------------------
        //              create calendar event
        // ------------------------------------------------
        else if (withCalendar) {
            let eventId: string | undefined = undefined;
            // TODO: ... set eventId ...
            createOrUpdateTask(Authorization, { ...task, eventId });
        }

        res.status(200).json({});
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
