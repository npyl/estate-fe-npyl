import { IEmailReq } from "@/types/email";
import { toNumberSafe } from "@/utils/toNumber";
import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../_service";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") throw "Bad method";

        // UserId
        const { userId } = req.query;
        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw "Bad userId";

        const _body = req.body as IEmailReq;
        const { to, subject, body } = _body;

        if (!to) throw "To is required";
        if (!subject) throw "Subject is required";
        if (!body) throw "Body is required";

        await gmailService.send(iUserId, _body);

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
