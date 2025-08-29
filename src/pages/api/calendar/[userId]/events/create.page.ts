import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import { TCalendarEventToGCalendarEvent } from "@/types/calendar/mapper";
import toNumberSafe from "@/utils/toNumberSafe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const event = req.body;

        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw new Error("Bad userId");

        // POST: create new event
        if (req.method !== "POST") throw new Error("Bad method");

        const body = TCalendarEventToGCalendarEvent(event);

        const eventId = await calendarService.createEvent(iUserId, body);

        res.status(200).send(eventId);
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
