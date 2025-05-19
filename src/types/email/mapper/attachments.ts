import { gmail_v1 } from "@googleapis/gmail";
import { TThreadAttachment } from "@/types/email";

const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const getAttachments = (
    payload: gmail_v1.Schema$MessagePart
): TThreadAttachment[] => {
    const attachments: TThreadAttachment[] = [];

    // Check if this part is an attachment
    if (payload.filename && payload.body?.attachmentId) {
        const id = payload.body?.attachmentId;
        const filename = payload.filename;
        const size = formatFileSize(payload.body.size ?? 0);
        attachments.push({ id, filename, size });
    }

    // Recursively check parts
    if (payload.parts) {
        for (const part of payload.parts) {
            attachments.push(...getAttachments(part));
        }
    }

    return attachments;
};

export default getAttachments;
