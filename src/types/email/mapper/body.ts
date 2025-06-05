import { gmail_v1 } from "@googleapis/gmail";

// Extract body content from message parts with HTML priority
const extractBodyFromParts = (parts: gmail_v1.Schema$MessagePart[]): string => {
    let htmlContent = "";
    let plainTextContent = "";

    const searchParts = (partsList: gmail_v1.Schema$MessagePart[]) => {
        for (const part of partsList) {
            // Check for HTML content
            if (part.mimeType === "text/html" && part.body?.data) {
                htmlContent = Buffer.from(part.body.data, "base64").toString(
                    "utf-8"
                );
            }
            // Check for plain text content
            else if (part.mimeType === "text/plain" && part.body?.data) {
                plainTextContent = Buffer.from(
                    part.body.data,
                    "base64"
                ).toString("utf-8");
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

// Standard HTML parsing approach
const extractOriginalFromHtml = (htmlBody: string): string => {
    // Create a simple DOM-like structure for parsing
    // This is a lightweight approach without external dependencies

    // Look for standard HTML email structures
    const quoteDivStart = htmlBody.indexOf('<div class="gmail_quote">');
    if (quoteDivStart !== -1) {
        return htmlBody.substring(0, quoteDivStart).trim();
    }

    // Look for blockquote tags (standard for replies)
    const blockquoteStart = htmlBody.indexOf("<blockquote");
    if (blockquoteStart !== -1) {
        return htmlBody.substring(0, blockquoteStart).trim();
    }

    // Look for common reply separators in HTML
    const separatorPatterns = [
        "<div>On ", // Gmail/Outlook
        '<div class="gmail_quote">', // Gmail
        "<div>-----Original Message-----</div>", // Outlook
        "<div>From:", // Outlook
        "<hr", // Horizontal rule separators
    ];

    let earliestIndex = htmlBody.length;
    for (const pattern of separatorPatterns) {
        const index = htmlBody.indexOf(pattern);
        if (index !== -1 && index < earliestIndex) {
            earliestIndex = index;
        }
    }

    if (earliestIndex < htmlBody.length) {
        return htmlBody.substring(0, earliestIndex).trim();
    }

    return htmlBody.trim();
};

// Standard plain text parsing approach
const extractOriginalFromPlainText = (textBody: string): string => {
    const lines = textBody.split("\n");
    const originalLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Standard email reply indicators
        if (
            trimmedLine.startsWith(">") || // Quote marker
            trimmedLine.startsWith("|") || // Some clients use |
            line.startsWith("    ")
        ) {
            // Outlook indentation
            break;
        }

        // Standard signature separators
        if (trimmedLine === "--" || trimmedLine === "___") {
            break;
        }

        // Standard reply headers (RFC compliant)
        if (isReplyHeader(line, lines, i)) {
            break;
        }

        // Standard forwarded message indicators
        if (
            trimmedLine === "---------- Forwarded message ----------" ||
            trimmedLine === "Begin forwarded message:" ||
            trimmedLine === "-----Original Message-----"
        ) {
            break;
        }

        originalLines.push(line);
    }

    return originalLines.join("\n").trim();
};

// RFC 2822 compliant reply header detection
const isReplyHeader = (
    line: string,
    allLines: string[],
    currentIndex: number
): boolean => {
    const trimmedLine = line.trim();

    // Pattern: "On [date] [person] wrote:"
    if (
        trimmedLine.includes(" wrote:") &&
        (trimmedLine.includes("On ") || trimmedLine.startsWith("On "))
    ) {
        return true;
    }

    // Multi-line Outlook format detection
    if (trimmedLine.startsWith("From:") && currentIndex < allLines.length - 3) {
        const nextLines = allLines.slice(currentIndex + 1, currentIndex + 4);
        const hasDate = nextLines.some(
            (l) => l.trim().startsWith("Date:") || l.trim().startsWith("Sent:")
        );
        const hasTo = nextLines.some((l) => l.trim().startsWith("To:"));
        const hasSubject = nextLines.some((l) =>
            l.trim().startsWith("Subject:")
        );

        return hasDate && (hasTo || hasSubject);
    }

    return false;
};

// Detect if content is HTML based on MIME type
const isHtmlContent = (payload?: gmail_v1.Schema$MessagePart): boolean => {
    if (!payload) return false;

    // Check the MIME type directly
    if (payload.mimeType === "text/html") {
        return true;
    }

    // For multipart messages, check if any part contains HTML
    if (payload.parts) {
        return payload.parts.some(
            (part) => part.mimeType === "text/html" || isHtmlContent(part)
        );
    }

    return false;
};

// Get the full message body with HTML priority
const getMessageBody = (payload?: gmail_v1.Schema$MessagePart): string => {
    if (!payload) return "";

    // Check if body is directly available
    if (payload.body?.data) {
        return Buffer.from(payload.body.data, "base64").toString("utf-8");
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

    // Determine if it's HTML or plain text using MIME type
    const isHtml = isHtmlContent(payload);

    if (!body || messageIndex === 0) {
        // First message in thread - return as is
        return body.trim();
    }

    if (isHtml) {
        return extractOriginalFromHtml(body);
    } else {
        return extractOriginalFromPlainText(body);
    }
};

export { extractOriginalContent };
