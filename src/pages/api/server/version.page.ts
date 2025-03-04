import type { NextApiRequest, NextApiResponse } from "next/types";

const buildId = process.env.NEXT_PUBLIC_BUILD_ID || "";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") throw new Error("Bad method");

        res.status(200).json({
            buildId,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({});
    }
}
