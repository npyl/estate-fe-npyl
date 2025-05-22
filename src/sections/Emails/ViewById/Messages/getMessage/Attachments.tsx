import { FC } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IThreadAttachmentShortRes } from "@/types/email";

interface AttachmentProps {
    a: IThreadAttachmentShortRes;
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

const getAttachment = (a: IThreadAttachmentShortRes) => (
    <Attachment key={a.id} a={a} />
);

interface AttachmentsProps {
    attachments: IThreadAttachmentShortRes[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments }) => (
    <Stack direction="row" spacing={1} flexWrap="wrap">
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
