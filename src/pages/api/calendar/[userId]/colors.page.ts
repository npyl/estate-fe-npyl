import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../_service/CalendarService";
import toNumberSafe from "@/utils/toNumberSafe";
import { GColorToTCalendarColor } from "@/types/calendar/mapper";

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

        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw new Error("Bad userId");

        const data = await calendarService.getColors(iUserId);

        const colors = data
            ? Object.entries(data).map(GColorToTCalendarColor)
            : [];

        // GET: check if user with id `userId` is authenticated
        res.status(200).json(colors);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
