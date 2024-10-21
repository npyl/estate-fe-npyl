import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../CalendarService";
import { toNumber } from "../../util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumber(userId);

        // POST: authenticate user with id `userId`
        if (req.method === "POST") {
            const authUrl = await calendarService.getAuthUrl(iUserId);
            res.status(200).json({
                authUrl,
            });
        }

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            const isAuthenticatedRes = await calendarService.isAuthenticated(
                iUserId
            );
            res.status(200).json(isAuthenticatedRes);
        }

        if (req.method === "DELETE") {
            await calendarService.revokeAuthentication(iUserId);
            res.status(200).json({});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
