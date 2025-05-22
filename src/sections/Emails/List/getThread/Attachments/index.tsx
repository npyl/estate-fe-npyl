import { FC } from "react";
import Stack from "@mui/material/Stack";
import { IThreadAttachmentShortRes } from "@/types/email";
import getAttachment from "./getAttachment";

interface AttachmentsProps {
    attachments: IThreadAttachmentShortRes[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments }) => (
    <Stack direction="row" spacing={1} flexWrap="wrap" height={25}>
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
