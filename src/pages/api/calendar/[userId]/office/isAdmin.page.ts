import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import { toNumber } from "../../../util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumber(userId);

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            const isAdmin = await calendarService.isAdmin(iUserId);
            res.status(200).json({ isAdmin });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
