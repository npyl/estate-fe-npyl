import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../../_service/CalendarService";
import { toNumber } from "../../../util";
import { GUserToIUserMini } from "@/types/user/google";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumber(userId);

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            const users = (await calendarService.getUsers(iUserId)) || [];
            console.log(users);
            res.status(200).json(users.map(GUserToIUserMini));
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
