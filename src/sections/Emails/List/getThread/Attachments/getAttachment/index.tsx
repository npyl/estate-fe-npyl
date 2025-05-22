import { FC, MouseEvent, useCallback } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IThreadAttachmentShortRes } from "@/types/email";
import { CircularProgress } from "@mui/material";
import useDialog from "@/hooks/useDialog";
import Chip from "./Chip";
import ViewerDialog from "@/sections/ViewerDialog";
import useAttachmentDataUrl from "./useAttachmentDataUrl";

interface AttachmentProps {
    a: IThreadAttachmentShortRes;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const [shouldLoad, start, stop] = useDialog();

    const [dataUrl, { isLoading }] = useAttachmentDataUrl(a, {
        skip: !shouldLoad,
    });

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

            {shouldLoad && dataUrl ? (
                <ViewerDialog
                    url={dataUrl}
                    mimeType={a.mimeType}
                    onClose={stop}
                />
            ) : null}
        </>
    );
};

const getAttachment = (a: IThreadAttachmentShortRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
