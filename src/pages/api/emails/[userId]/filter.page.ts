import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../_service";
import { toNumberSafe } from "@/utils/toNumber";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") throw "Bad method";

        const { userId } = req.query;
        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw "Bad userId";

        const data = await gmailService.filter(iUserId);
        const ret = data ?? [];

        res.status(200).json(ret);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
