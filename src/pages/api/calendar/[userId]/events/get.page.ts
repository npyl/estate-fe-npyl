import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../CalendarService";
import { GCalendarToTCalendarEvent } from "@/types/calendar/mapper";

// TODO: for now...
import fakeEvents from "./fakeEvents";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
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

        const auth = await calendarService.authenticateForUser(iUserId);
        const { data } =
            (await calendarService.getEvents(auth, startDate, endDate)) || {};

        const events = data.items?.map(GCalendarToTCalendarEvent) || [];

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            res.status(200).json([...events, ...fakeEvents]);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
