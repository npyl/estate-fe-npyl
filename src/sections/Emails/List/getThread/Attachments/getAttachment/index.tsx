import { FC, MouseEvent, useCallback } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IThreadAttachmentRes } from "@/types/email";
import { CircularProgress } from "@mui/material";
import useDialog from "@/hooks/useDialog";
import { useGetAttachmentQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Chip from "./Chip";
import Viewer from "./Viewer";

interface AttachmentProps {
    a: IThreadAttachmentRes;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const [shouldLoad, start, stop] = useDialog();

    const { user } = useAuth();
    const { data, isLoading } = useGetAttachmentQuery(
        {
            userId: user?.id!,
            messageId: a.messageId,
            attachmentId: a.id,
        },
        { skip: !shouldLoad }
    );
    const { base64 } = data || {};

    const icon = isLoading ? (
        <CircularProgress size={15} />
    ) : (
        <AttachmentIcon />
    );

    const onClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            start();
        },
        [start]
    );

    return (
        <>
            <Chip
                icon={icon}
                label={`${a.filename} (${a.size})`}
                onClick={onClick}
            />

            {shouldLoad && base64 ? (
                <Viewer
                    data={base64}
                    mimeType="image/png"
                    fileName={a.filename}
                    onClose={stop}
                />
            ) : null}
        </>
    );
};

const getAttachment = (a: IThreadAttachmentRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
