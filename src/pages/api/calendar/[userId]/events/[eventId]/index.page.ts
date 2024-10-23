import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../../CalendarService";
import { toNumber } from "@/pages/api/util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;
        const eventId = req.query.eventId as string;

        const iUserId = toNumber(userId);
        if (!eventId) throw new Error("Undefined eventId");

        // DELETE
        if (req.method === "DELETE") {
            await calendarService.deleteEvent(iUserId, eventId);
        }

        // UPDATE
        if (req.method === "PUT") {
            const body = req.body;
            await calendarService.updateEvent(iUserId, body);
        }

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
