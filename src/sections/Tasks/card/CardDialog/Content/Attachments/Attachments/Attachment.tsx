import { FC, useCallback, useMemo } from "react";
import { useDeleteAttachmentMutation } from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import { useAttachmentsContext } from "../Context";
import PPAttachment from "@/ui/Attachment";

const IKanbanAttachmentToPPAttachment = ({
    id,
    filename,
    contentType,
    cdnUrl,
}: IKanbanAttachment) => ({
    id,
    filename,
    mimeType: contentType,
    url: `https://${cdnUrl}`,
});

interface AttachmentProps {
    a: IKanbanAttachment;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const { setAttachments } = useAttachmentsContext();

    const [deleteAttachment] = useDeleteAttachmentMutation();

    const onDelete = useCallback(async (attachmentId: number) => {
        await deleteAttachment(attachmentId);
        setAttachments((old) => old?.filter(({ id }) => id !== attachmentId));
    }, []);

    const attachment = useMemo(() => IKanbanAttachmentToPPAttachment(a), [a]);

    return <PPAttachment a={attachment} onDelete={onDelete as any} />;
};

export default Attachment;
