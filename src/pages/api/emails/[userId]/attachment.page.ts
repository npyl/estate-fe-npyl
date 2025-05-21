import { toNumberSafe } from "@/utils/toNumber";
import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../_service";
import { IGetAttachmentReq } from "@/types/email";

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

        const _body = req.body as IGetAttachmentReq;
        const { attachmentId, messageId } = _body;

        if (!messageId) throw "No messageId provided";
        if (!attachmentId) throw "No attachmentId provided";

        const result = await gmailService.getAttachment(
            iUserId,
            messageId,
            attachmentId
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
