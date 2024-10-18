import type { NextApiRequest, NextApiResponse } from "next/types";

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

        // const auth = await calendarService.authenticateForUser(iUserId);

        // POST: create new event
        if (req.method === "POST") {
            res.status(200).json({});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
