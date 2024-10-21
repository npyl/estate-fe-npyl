import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../../CalendarService";
import { toNumber } from "@/pages/api/util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, eventId } = req.query;

        const iUserId = toNumber(userId);

        // DELETE
        if (req.method === "DELETE") {
            await calendarService.deleteEvent(iUserId, eventId as string);
        }

        // UPDATE
        if (req.method === "PUT") {
        }

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
