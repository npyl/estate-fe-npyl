import { FC } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { TThreadAttachment } from "@/types/email";

interface AttachmentProps {
    a: TThreadAttachment;
}

const Attachment: FC<AttachmentProps> = ({ a }) => (
    <Chip
        key={a.id}
        icon={<AttachmentIcon />}
        label={`${a.filename} (${a.size})`}
        variant="outlined"
        size="small"
    />
);

const getAttachment = (a: TThreadAttachment) => <Attachment key={a.id} a={a} />;

interface AttachmentsProps {
    attachments: TThreadAttachment[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments }) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
