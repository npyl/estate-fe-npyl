import { FC } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IThreadAttachmentRes } from "@/types/email";

interface AttachmentProps {
    a: IThreadAttachmentRes;
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

const getAttachment = (a: IThreadAttachmentRes) => (
    <Attachment key={a.id} a={a} />
);

interface AttachmentsProps {
    attachments: IThreadAttachmentRes[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments }) => (
    <Stack direction="row" spacing={1} flexWrap="wrap" height={25}>
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
