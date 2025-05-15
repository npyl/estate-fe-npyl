import { toNumberSafe } from "@/utils/toNumber";
import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../../_service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") throw "Bad method";

        // UserId
        const { userId, threadId } = req.query;
        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw "Bad userId";
        if (!threadId) throw "Bad threadId";

        const data = await gmailService.get(iUserId, threadId as string);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
