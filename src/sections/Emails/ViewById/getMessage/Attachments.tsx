import Typography from "@mui/material/Typography";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { gmail_v1 } from "@googleapis/gmail";

const getAttachments = (
    payload: gmail_v1.Schema$MessagePart
): gmail_v1.Schema$MessagePart[] => {
    const attachments: gmail_v1.Schema$MessagePart[] = [];

    // Check if this part is an attachment
    if (payload.filename && payload.body?.attachmentId) {
        attachments.push(payload);
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

interface AttachmentsProps {
    payload: gmail_v1.Schema$MessagePart;
}

const Attachments: FC<AttachmentsProps> = ({ payload }) => {
    const attachments = payload ? getAttachments(payload) : [];

    return (
        attachments.length > 0 && (
            <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Attachments ({attachments.length})
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {attachments.map((attachment, index) => (
                        <Chip
                            key={index}
                            icon={<AttachmentIcon />}
                            label={`${attachment.filename} (${formatFileSize(attachment.body?.size ?? 0)})`}
                            variant="outlined"
                            size="small"
                            sx={{ mb: 0.5 }}
                        />
                    ))}
                </Stack>
            </Box>
        )
    );
};

export default Attachments;
