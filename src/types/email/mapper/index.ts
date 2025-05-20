import { gmail_v1 } from "@googleapis/gmail";
import { TThreadMessageRes, TThreadRes } from "@/types/email";
import { extractOriginalContent } from "./body";
import { getHeaderValue } from "./util";
import getAttachments from "./attachments";

const getThreadMessage = (
    m: gmail_v1.Schema$Message | undefined,
    messageIndex: number
): TThreadMessageRes => {
    const { id, payload } = m || {};

    const { headers } = payload || {};

    const from = getHeaderValue(headers ?? [], "From") || "";
    const date = getHeaderValue(headers ?? [], "Date") || "";

    // Extract only the original content using standard approaches
    const originalBody = extractOriginalContent(payload, messageIndex);

    const attachments = payload ? getAttachments(payload) : [];

    return { id: id!, from, date, body: originalBody, attachments };
};

const parseEmailAddress = (fullEmailString: string): string => {
    // Handle format "Name <email@example.com>"
    const lessThanIndex = fullEmailString.indexOf("<");
    const greaterThanIndex = fullEmailString.indexOf(">");

    if (
        lessThanIndex !== -1 &&
        greaterThanIndex !== -1 &&
        lessThanIndex < greaterThanIndex
    ) {
        return fullEmailString
            .substring(lessThanIndex + 1, greaterThanIndex)
            .trim();
    }

    // If no angle brackets, assume the whole string is an email if it contains @
    if (fullEmailString.includes("@")) {
        return fullEmailString.trim();
    }

    return fullEmailString; // Return original if parsing fails
};

const GMailThreadToPPThread = (t: gmail_v1.Schema$Thread): TThreadRes => {
    const heads0 = t?.messages?.at(0)?.payload?.headers ?? [];
    const subject = getHeaderValue(heads0, "Subject");

    const messages = t?.messages?.map(getThreadMessage) ?? [];

    const initiator =
        messages.length > 0 ? parseEmailAddress(messages[0].from) : "";

    return {
        id: t?.id!,
        snippet: t?.snippet || "",
        messages,
        subject,
        initiator,
        date: "",
    };
};

export { GMailThreadToPPThread };
