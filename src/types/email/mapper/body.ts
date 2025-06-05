import { gmail_v1 } from "@googleapis/gmail";

const decodeB64 = (s: string) => Buffer.from(s, "base64").toString("utf-8");

// Extract body content from message parts with HTML priority
const extractBodyFromParts = (parts: gmail_v1.Schema$MessagePart[]): string => {
    let htmlContent = "";
    let plainTextContent = "";

    const searchParts = (partsList: gmail_v1.Schema$MessagePart[]) => {
        for (const part of partsList) {
            // Check for HTML content
            if (part.mimeType === "text/html" && part.body?.data) {
                htmlContent = decodeB64(part.body.data);
            }
            // Check for plain text content
            else if (part.mimeType === "text/plain" && part.body?.data) {
                plainTextContent = decodeB64(part.body.data);
            }

            // Recursively search in nested parts
            if (part.parts) {
                searchParts(part.parts);
            }
        }
    };

    // Search through all parts
    searchParts(parts);

    // Return HTML content if available, otherwise return plain text
    return htmlContent || plainTextContent;
};

// Get the full message body with HTML priority
const getMessageBody = (payload?: gmail_v1.Schema$MessagePart): string => {
    if (!payload) return "";

    // Check if body is directly available
    if (payload.body?.data) {
        return decodeB64(payload.body.data);
    }

    // Check in parts with HTML priority
    if (payload.parts) {
        return extractBodyFromParts(payload.parts);
    }

    return "";
};

const extractOriginalContent = (
    payload: gmail_v1.Schema$MessagePart | undefined,
    messageIndex: number
): string => {
    const body = getMessageBody(payload);

    if (!body || messageIndex === 0) {
        // First message in thread - return as is
        return body.trim();
    }

    return body;
};

export { extractOriginalContent };
