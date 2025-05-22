import { FC } from "react";
import { IThreadAttachmentShortRes } from "@/types/email";
import Viewer from "@/sections/Viewer";
import useAttachmentDataUrl from "@/sections/Emails/List/getThread/Attachments/getAttachment/useAttachmentDataUrl";
import Skeleton from "./Skeleton";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

const AttachmentSx: SxProps<Theme> = {
    "&:hover": {
        border: "1px solid",
        borderColor: "info.main",
        borderRadius: 5,
    },
};

interface AttachmentProps {
    a: IThreadAttachmentShortRes;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    const [url, { isLoading }] = useAttachmentDataUrl(a, { skip: false });
    if (isLoading) return <Skeleton />;
    if (!url) return null;
    return (
        <Box sx={AttachmentSx}>
            <Viewer
                url={url}
                mimeType={a.mimeType}
                style={{
                    width: 200,
                    height: 150,
                    borderRadius: 5,
                }}
            />
        </Box>
    );
};

const getAttachment = (a: IThreadAttachmentShortRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
