import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../CalendarService";
import GCalendarToTCalendarEvent from "@/types/calendar/mapper";
import { toNumber } from "@/pages/api/util";

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

        const iUserId = toNumber(userId);

        const { data } = await calendarService.getEvents(
            iUserId,
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
