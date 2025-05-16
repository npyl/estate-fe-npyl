import { gmail_v1 } from "@googleapis/gmail";
import { TThreadAttachment, TThreadMessage } from "@/types/email";

const getHeaderValue = (
    headers: gmail_v1.Schema$MessagePartHeader[],
    name: string
): string => {
    const header = headers?.find(
        (h) => h.name?.toLowerCase() === name.toLowerCase()
    );
    return header?.value || "";
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

// Helper function to format file size
const formatFileSize = (bytes?: number): string => {
    if (!bytes) return "Unknown size";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const getThreadMessage = (m?: gmail_v1.Schema$Message): TThreadMessage => {
    const { id, payload } = m || {};

    const { headers } = payload || {};

    const from = getHeaderValue(headers ?? [], "From") || "";
    const date = getHeaderValue(headers ?? [], "Date") || "";

    const attachments = payload ? getAttachments(payload) : [];

    return { id: id!, from, date, body: "", attachments };
};

const GMailThreadToPPThread = (t: gmail_v1.Schema$Thread) => {
    const heads0 = t?.messages?.at(0)?.payload?.headers ?? [];
    const subject = getHeaderValue(heads0, "Subject");

    const messages = t?.messages?.map(getThreadMessage) ?? [];

    return {
        id: t?.id!,
        snippet: t?.snippet || "",
        messages,
        subject,
    };
};

export { GMailThreadToPPThread };
