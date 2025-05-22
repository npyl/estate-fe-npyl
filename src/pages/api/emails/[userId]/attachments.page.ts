import { toNumberSafe } from "@/utils/toNumber";
import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../_service";
import { IGetAttachmentReq, IGetAttachmentsReq } from "@/types/email";

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

        const _body = req.body as IGetAttachmentsReq;
        const { attachmentIds, messageId } = _body;

        if (!messageId) throw "No messageId provided";
        if (!attachmentIds) throw "No attachmentIds provided";

        const base64 = await gmailService.getAttachments(
            iUserId,
            messageId,
            attachmentIds
        );

        res.status(200).json({ base64 });
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
