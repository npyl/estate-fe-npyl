import type { NextApiRequest, NextApiResponse } from "next/types";
import { toNumber } from "../util";

// -----------------------------------------------------------------------

const companyId = process.env.COMPANY_ID;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST" && req.method !== "GET")
            throw new Error("Bad method");

        const Authorization = req.headers.authorization;
        if (!Authorization) throw new Error("Invalid headers");

        // TODO: check
        // TODO: update

        res.status(200).json({});
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
