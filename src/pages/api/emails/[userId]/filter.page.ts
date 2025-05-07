import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
