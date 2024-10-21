import { toNumber } from "@/pages/api/util";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query;

        const iUserId = toNumber(userId);

        // POST: create new event
        if (req.method === "POST") {
            res.status(200).json({});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
