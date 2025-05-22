import { gmail_v1 } from "@googleapis/gmail";
import { IThreadAttachmentShortRes } from "@/types/email";

const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const getAttachments = (
    messageId: string,
    payload: gmail_v1.Schema$MessagePart
): IThreadAttachmentShortRes[] => {
    const attachments: IThreadAttachmentShortRes[] = [];

    // Check if this part is an attachment
    if (payload.filename && payload.body?.attachmentId) {
        // INFO: prevent adding files with unrecognized mimeType (is this even possible?)
        if (!payload.mimeType) return [];

        const id = payload.body?.attachmentId;
        const filename = payload.filename;
        const size = formatFileSize(payload.body.size ?? 0);
        attachments.push({
            id,
            filename,
            size,
            messageId,
            mimeType: payload.mimeType,
        });
    }

    // Recursively check parts
    if (payload.parts) {
        for (const part of payload.parts) {
            attachments.push(...getAttachments(messageId, part));
        }
    }

    return attachments;
};

// --------------------------------------------------------------------------

const message2Attachment = ({ id, payload }: gmail_v1.Schema$Message) =>
    getAttachments(id!, payload!);

/**
 * Gather all attachments from a list of google messages
 * @param m list of gmail messages
 * @returns
 */
const getAttachmentsFromMessages = (m: gmail_v1.Schema$Message[]) => {
    const attachmentSet = new Set(m.map(message2Attachment).flat());
    const attachments = Array.from(attachmentSet);
    return attachments;
};

export { getAttachmentsFromMessages };
export default getAttachments;
