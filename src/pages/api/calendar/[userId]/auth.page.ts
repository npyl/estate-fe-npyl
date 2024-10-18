import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "../CalendarService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        if (typeof userId !== "string")
            return res.status(400).json({ error: "Invalid userId" });
        const iUserId = parseInt(userId, 10);
        if (isNaN(iUserId))
            return res.status(400).json({ error: "Invalid userId" });

        // POST: authenticate user with id `userId`
        if (req.method === "POST") {
            const authUrl = await calendarService.getAuthUrl(iUserId);
            res.status(200).json({
                authUrl,
            });
        }

        const isAuthenticatedRes = await calendarService.isAuthenticated(
            iUserId
        );

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            res.status(200).json(isAuthenticatedRes);
        }

        if (req.method === "DELETE") {
            calendarService.revokeAuthentication(iUserId);
            res.status(200).json({});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
