import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../../_service/CalendarService";
import { TCalendarEventToGCalendarEvent } from "@/types/calendar/mapper";
import toNumberSafe from "@/utils/toNumberSafe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw new Error("Bad userId");

        const eventId = req.query.eventId as string;
        if (!eventId) throw new Error("Undefined eventId");

        // DELETE
        if (req.method === "DELETE") {
            await calendarService.deleteEvent(iUserId, eventId);
        }

        // UPDATE
        if (req.method === "PUT") {
            const event = req.body;
            const body = TCalendarEventToGCalendarEvent(event);
            await calendarService.updateEvent(iUserId, body);
        }

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
