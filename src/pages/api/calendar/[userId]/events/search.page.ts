import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import { GCalendarToTCalendarEvent } from "@/types/calendar/mapper";
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
        const query = url.searchParams.get("query");
        const startDate = url.searchParams.get("startDate") || undefined;
        const endDate = url.searchParams.get("endDate") || undefined;
        if (!query) throw new Error("No query!");

        const iUserId = toNumber(userId);

        const { data } = await calendarService.searchEvents(
            iUserId,
            query,
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
