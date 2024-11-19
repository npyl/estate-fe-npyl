import type { NextApiRequest, NextApiResponse } from "next/types";

// -----------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "PUT" && req.method !== "GET")
            throw new Error("Bad method");

        // TODO: check
        // TODO: update

        res.status(200).json({
            isIntegrated: true,
        });
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
