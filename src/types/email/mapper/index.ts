import { gmail_v1 } from "@googleapis/gmail";
import { TThreadMessage } from "@/types/email";
import { extractOriginalContent } from "./body";
import { getHeaderValue } from "./util";
import getAttachments from "./attachments";

const getThreadMessage = (
    m: gmail_v1.Schema$Message | undefined,
    messageIndex: number
): TThreadMessage => {
    const { id, payload } = m || {};

    const { headers } = payload || {};

    const from = getHeaderValue(headers ?? [], "From") || "";
    const date = getHeaderValue(headers ?? [], "Date") || "";

    // Extract only the original content using standard approaches
    const originalBody = extractOriginalContent(payload, messageIndex);

    const attachments = payload ? getAttachments(payload) : [];

    return { id: id!, from, date, body: originalBody, attachments };
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
