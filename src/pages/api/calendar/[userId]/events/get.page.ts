import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../CalendarService";
import { GCalendarToTCalendarEvent } from "@/types/calendar/mapper";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") {
            res.status(404).json({});
            return;
        }

        const { userId } = req.query;

        const url = new URL(req.url!, `http://${req.headers.host}`);
        const startDate = url.searchParams.get("startDate");
        const endDate = url.searchParams.get("endDate");
        if (!startDate || !endDate) throw new Error("error!");

        if (typeof userId !== "string")
            return res.status(400).json({ error: "Invalid userId" });
        const iUserId = parseInt(userId, 10);
        if (isNaN(iUserId))
            return res.status(400).json({ error: "Invalid userId" });

        const { data } = await calendarService.getEvents(
            +userId,
            startDate,
            endDate
        );

        const events = data.items?.map(GCalendarToTCalendarEvent) || [];

        // GET: check if user with id `userId` is authenticated
        res.status(200).json(events);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
