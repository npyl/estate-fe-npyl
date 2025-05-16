import Typography from "@mui/material/Typography";
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

// Helper function to extract plain text body
const getMessageBody = (payload: gmail_v1.Schema$MessagePart): string => {
    let body = "";

    // Check if this part is plain text
    if (payload.mimeType === "text/plain" && payload.body?.data) {
        return decodeBase64(payload.body.data);
    }

    // Check if this part is HTML (fallback if no plain text)
    if (payload.mimeType === "text/html" && payload.body?.data) {
        const htmlContent = decodeBase64(payload.body.data);
        // Simple HTML to text conversion (you might want to use a library for this)
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    // If this is a multipart message, recursively check parts
    if (payload.parts) {
        for (const part of payload.parts) {
            body = getMessageBody(part);
            if (body) break;
        }
    }

    return body;
};

interface BodyProps {
    payload: gmail_v1.Schema$MessagePart;
}

const Body: FC<BodyProps> = ({ payload }) => {
    const body = payload ? getMessageBody(payload) : "";

    return (
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {body || "No content available"}
        </Typography>
    );
};

export default Body;
