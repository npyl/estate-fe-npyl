import toNumberSafe from "@/utils/toNumberSafe";
import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../../_service";
import { GMailThreadToPPThread } from "@/types/email";

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

        const thread = GMailThreadToPPThread(data);

        res.status(200).json(thread);
    } catch (error) {
        console.error(error);
        res.status(404).json({});
    }
}
