import { FC, MouseEvent, useCallback } from "react";
import { IThreadAttachmentShortRes } from "@/types/email";
import useDialog from "@/hooks/useDialog";
import ViewerDialog from "@/ui/ViewerDialog";
import useAttachmentDataUrl from "./useAttachmentDataUrl";
import Chip from "./Chip";

interface AttachmentProps {
    a: IThreadAttachmentShortRes;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const [shouldLoad, start, stop] = useDialog();

    const [dataUrl, { isLoading }] = useAttachmentDataUrl(a, {
        skip: !shouldLoad,
    });

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
                loading={isLoading}
                mimeType={a.mimeType}
                filename={a.filename}
                size={a.size}
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
