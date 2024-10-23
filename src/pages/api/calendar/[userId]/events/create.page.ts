import { toNumber } from "@/pages/api/util";
import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../CalendarService";
import { TCalendarEventToGCalendarEvent } from "@/types/calendar/mapper";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const event = req.body;

        const iUserId = toNumber(userId);

        // POST: create new event
        if (req.method !== "POST") throw new Error("Bad method");

        const body = TCalendarEventToGCalendarEvent(event);

        const ret = await calendarService.createEvent(iUserId, body);
        if (!ret) throw new Error("Create failed!");

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
