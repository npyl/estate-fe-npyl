import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FC } from "react";
import { gmail_v1 } from "@googleapis/gmail";

// Helper function to decode base64 content
const decodeBase64 = (encoded: string): string => {
    try {
        // Gmail API returns base64url encoded strings, we need to convert to regular base64
        const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
        return atob(base64);
    } catch (error) {
        console.error("Error decoding base64:", error);
        return "";
    }
};

// Helper function to extract and process message body
const getMessageBody = (
    payload: gmail_v1.Schema$MessagePart
): {
    originalContent: string;
    quotedContent: string[];
} => {
    let content = "";

    // First, try to get the plain text content
    if (payload.mimeType === "text/plain" && payload.body?.data) {
        content = decodeBase64(payload.body.data);
    }
    // If no plain text, try HTML (as fallback)
    else if (payload.mimeType === "text/html" && payload.body?.data) {
        const htmlContent = decodeBase64(payload.body.data);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        content = tempDiv.textContent || tempDiv.innerText || "";
    }
    // If this is a multipart message, recursively check parts
    else if (payload.parts) {
        for (const part of payload.parts) {
            if (part.mimeType === "text/plain") {
                content = part.body?.data ? decodeBase64(part.body.data) : "";
                if (content) break;
            }
        }

        // If still no content, try HTML parts
        if (!content) {
            for (const part of payload.parts) {
                if (part.mimeType === "text/html") {
                    const htmlContent = part.body?.data
                        ? decodeBase64(part.body.data)
                        : "";
                    if (htmlContent) {
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = htmlContent;
                        content =
                            tempDiv.textContent || tempDiv.innerText || "";
                        break;
                    }
                }
            }
        }
    }

    // Process and split the content into original and quoted parts
    return processEmailContent(content);
};

// Function to separate original content from quoted replies
const processEmailContent = (
    content: string
): {
    originalContent: string;
    quotedContent: string[];
} => {
    if (!content) {
        return { originalContent: "", quotedContent: [] };
    }

    // Common patterns for quoted replies in emails
    const quotePatterns = [
        // Gmail-style quotes
        /On .+? wrote:[\s\S]*/i,
        // Various "From:" style quotes
        /From:[\s\S]*/i,
        // Other common patterns
        /-{3,}[\s\S]*/,
        />{2,}[\s\S]*/,
        /\bForwarded message\b[\s\S]*/i,
    ];

    let originalContent = content;
    const quotedContent: string[] = [];

    // Try to find quoted text using the patterns
    for (const pattern of quotePatterns) {
        const match = originalContent.match(pattern);
        if (match && match.index !== undefined) {
            // Extract the quoted part
            const quoted = originalContent.substring(match.index);
            quotedContent.push(quoted);

            // Keep only the original part
            originalContent = originalContent.substring(0, match.index).trim();
            break; // Stop after first match
        }
    }

    // Look for lines starting with ">" which are common in email quotes
    if (quotedContent.length === 0) {
        const lines = content.split("\n");
        const originalLines: string[] = [];
        const quotedLines: string[] = [];
        let foundQuote = false;

        for (const line of lines) {
            if (line.trim().startsWith(">")) {
                foundQuote = true;
                quotedLines.push(line);
            } else if (foundQuote && line.trim() === "") {
                // Empty lines in quoted section still belong to quotes
                quotedLines.push(line);
            } else if (foundQuote) {
                // If we found a non-quote line after quotes, check if it looks like a signature
                if (
                    line.match(/^-- $/) ||
                    line.match(/^Regards,/) ||
                    line.match(/^Sincerely,/)
                ) {
                    quotedLines.push(line);
                } else {
                    originalLines.push(line);
                }
            } else {
                originalLines.push(line);
            }
        }

        if (foundQuote) {
            originalContent = originalLines.join("\n");
            quotedContent.push(quotedLines.join("\n"));
        }
    }

    return {
        originalContent: originalContent.trim(),
        quotedContent: quotedContent,
    };
};

interface BodyProps {
    payload: gmail_v1.Schema$MessagePart;
}

const Body: FC<BodyProps> = ({ payload }) => {
    const { originalContent, quotedContent } = payload
        ? getMessageBody(payload)
        : {
              originalContent: "",
              quotedContent: [],
          };

    return (
        <Box>
            {/* Original message content */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {originalContent || "No content available"}
            </Typography>

            {/* Quoted content (previous messages) - only if there are any */}
            {quotedContent.length > 0 && (
                <Box
                    mt={2}
                    pt={1}
                    borderTop="1px solid"
                    borderColor="divider"
                    sx={{ opacity: 0.8 }}
                >
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        mb={1}
                    >
                        Previous messages:
                    </Typography>
                    {quotedContent.map((quote, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                whiteSpace: "pre-wrap",
                                pl: 1,
                                borderLeft: "2px solid",
                                borderColor: "divider",
                                fontSize: "0.9em",
                            }}
                        >
                            {quote}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Body;
