import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import { GUserToGUserMini } from "@/types/user/google";
import toNumberSafe from "@/utils/toNumberSafe";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw new Error("Bad userId");

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            const users = (await calendarService.getUsers(iUserId)) || [];
            res.status(200).json(users.map(GUserToGUserMini));
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
