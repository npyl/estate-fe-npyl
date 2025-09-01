import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import toNumberSafe from "@/utils/toNumberSafe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "DELETE") {
            res.status(404).json({});
            return;
        }

        const { userId } = req.query;

        if (!("date" in req.body)) throw "Did not find a date";

        const { date } = req.body;

        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw new Error("Bad userId");

        await calendarService.deleteDayEvents(iUserId, date);

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
