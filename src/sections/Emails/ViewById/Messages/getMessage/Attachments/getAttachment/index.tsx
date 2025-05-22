import useAttachmentDataUrl from "@/sections/Emails/List/getThread/Attachments/getAttachment/useAttachmentDataUrl";
import { IThreadAttachmentShortRes } from "@/types/email";
import PPAttachment from "@/sections/Attachment";
import Skeleton from "./Skeleton";
import { FC } from "react";

interface AttachmentProps {
    a: IThreadAttachmentShortRes;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const [url, { isLoading }] = useAttachmentDataUrl(a, { skip: false });
    if (isLoading) return <Skeleton />;
    if (!url) return null;
    return <PPAttachment a={{ ...a, url }} />;
};

const getAttachment = (a: IThreadAttachmentShortRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
