import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // POST: create new task
        if (req.method !== "POST") throw new Error("Bad method");

        console.log("EDW!");

        res.status(200).json({});
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
