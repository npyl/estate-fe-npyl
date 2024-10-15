import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "./CalendarService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // POST: authenticate
    if (req.method === "POST") {
        try {
            const auth = await calendarService.authenticateForUser(1);
            const events = await calendarService.getEvents(auth);

            console.log("EVENTS: ", events);

            res.status(200).json(events.data);
        } catch (error) {
            console.error("Error:", error);
            res.status(404).json({});
        }
    }

    // GET: check if there is an auth
    if (req.method === "GET") {
        const isAuthenticated = calendarService.isAuthenticated(1);

        res.status(200).json({});
    }
}
