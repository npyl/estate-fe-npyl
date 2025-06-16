import { FC } from "react";
import { IThreadAttachmentShortRes } from "@/types/email";
import getAttachment from "./getAttachment";
import ResponsiveStack, { ResponsiveStackProps } from "@/ui/ResponsiveStack";

interface AttachmentsProps extends ResponsiveStackProps {
    attachments: IThreadAttachmentShortRes[];
}

const Attachments: FC<AttachmentsProps> = ({ attachments, ...props }) => (
    <ResponsiveStack height={40} {...props}>
        {attachments.map(getAttachment)}
    </ResponsiveStack>
);

export default Attachments;
