import { FC, MouseEvent, useCallback } from "react";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { IThreadAttachmentRes } from "@/types/email";
import { CircularProgress } from "@mui/material";
import useDialog from "@/hooks/useDialog";
import { useGetAttachmentQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Chip from "./Chip";

function base64UrlToStandardBase64(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
        base64 += "=";
    }
    return base64;
}

interface ViewerProps {
    data: string;
    onClose: VoidFunction;
}

const Viewer: FC<ViewerProps> = ({ data }) => {
    const standardBase64 = base64UrlToStandardBase64(data);
    const dataUrl = `data:image/png;base64,${standardBase64}`;
    return <img src={dataUrl} />;
};

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
    const icon = isLoading ? (
        <CircularProgress size={15} />
    ) : (
        <AttachmentIcon />
    );

    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        start();
    }, []);

    return (
        <>
            <Chip
                icon={icon}
                label={`${a.filename} (${a.size})`}
                onClick={onClick}
            />

            {shouldLoad && data ? <Viewer data={data} onClose={stop} /> : null}
        </>
    );
};

const getAttachment = (a: IThreadAttachmentRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
