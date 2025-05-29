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
        spacing={2}
        flexWrap="wrap"
        borderTop="1px dashed"
        borderColor={getBorderColor2}
        py={1}
        mt={3}
    >
        {attachments.map(getAttachment)}
    </Stack>
);

export default Attachments;
