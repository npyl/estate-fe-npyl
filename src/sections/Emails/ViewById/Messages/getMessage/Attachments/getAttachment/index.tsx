import useAttachmentDataUrl from "@/sections/Emails/List/getThread/Attachments/getAttachment/useAttachmentDataUrl";
import { IThreadAttachmentShortRes } from "@/types/email";
import PPAttachment from "@/ui/Attachment";
import Skeleton from "./Skeleton";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MimeTypeIcon from "@/components/MimeTypeIcon";
import { SpaceBetween } from "@/components/styled";
import { SxProps, Theme } from "@mui/material";
import DownloadButton from "./DownloadButton";

const DOWNLOAD_BTN_CLASSNAME = "PPEmailAttachmentDownloadBtn";

const DescriptionSx: SxProps<Theme> = {
    [`.${DOWNLOAD_BTN_CLASSNAME}`]: {
        visibility: "hidden",
    },

    "&:hover": {
        [`.${DOWNLOAD_BTN_CLASSNAME}`]: {
            visibility: "visible",
        },
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
        <Stack spacing={1} sx={DescriptionSx}>
            <PPAttachment a={{ ...a, url }} />

            <SpaceBetween alignItems="center">
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                    maxWidth="150px"
                >
                    <MimeTypeIcon mimeType={a.mimeType} />

                    <Typography
                        width="max-content"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        {a.filename}
                    </Typography>
                </Stack>

                <DownloadButton
                    className={DOWNLOAD_BTN_CLASSNAME}
                    url={url}
                    filename={a.filename}
                />
            </SpaceBetween>
        </Stack>
    );
};

const getAttachment = (a: IThreadAttachmentShortRes) => (
    <Attachment key={a.id} a={a} />
);

export default getAttachment;
