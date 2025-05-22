import { FC } from "react";
import Stack from "@mui/material/Stack";
import { IThreadAttachmentShortRes } from "@/types/email";
import getAttachment from "./getAttachment";
import { getBorderColor2 } from "@/theme/borderColor";

interface AttachmentsProps {
    attachments: IThreadAttachmentShortRes[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments }) => (
    <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        borderTop="1px solid"
        borderColor={getBorderColor2}
        py={1}
    >
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
