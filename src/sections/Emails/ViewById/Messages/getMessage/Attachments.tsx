import { FC, useMemo } from "react";
import Stack from "@mui/material/Stack";
import { IThreadAttachmentRes, IThreadAttachmentShortRes } from "@/types/email";
import { useGetAttachmentsQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import { attachmentData2Url } from "@/sections/Emails/utils";
import Viewer from "@/sections/Viewer";

interface AttachmentProps {
    a: IThreadAttachmentRes;
    mimeType: string;
}

const Attachment: FC<AttachmentProps> = ({ a: { base64 }, mimeType }) => {
    const url = attachmentData2Url(base64, mimeType);
    return <Viewer url={url} mimeType={mimeType} />;
};

const getAttachment =
    (attachmentIds: string[], mimeTypes: string[]) =>
    (a: IThreadAttachmentRes, idx: number) => (
        <Attachment
            key={attachmentIds.at(idx)}
            a={a}
            mimeType={mimeTypes.at(idx) ?? ""}
        />
    );

interface AttachmentsProps {
    messageId: string;
    attachments: IThreadAttachmentShortRes[];
}

const Attachments: FC<AttachmentsProps> = ({ messageId, attachments }) => {
    const [attachmentIds, mimeTypes] = useMemo(
        () => attachments.map(({ id, mimeType }) => [id, mimeType]),
        [attachments]
    );

    const { user } = useAuth();
    const { data } = useGetAttachmentsQuery({
        userId: user?.id!,
        messageId,
        attachmentIds,
    });

    return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {data?.map(getAttachment(attachmentIds, mimeTypes))}
        </Stack>
    );
};

export default Attachments;
