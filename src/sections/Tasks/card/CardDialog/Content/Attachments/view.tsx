import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Skeleton, SxProps, Theme } from "@mui/material";
import {
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import PreviewImage from "@/components/image/PreviewImage";

// --------------------------------------------------------------

const IconButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    "&:hover": {
        backgroundColor: "background.paper",
    },
    borderRadius: "16px",
    p: 0.5,
};

const ImageSx: SxProps<Theme> = {
    border: "3px solid",
    borderRadius: "18px",
    borderColor: "neutral.300",
    width: "180px",
    height: "150px",
};

interface DeleteButtonProps {
    attachmentId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ attachmentId }) => {
    const [deleteAttachment] = useDeleteAttachmentMutation();

    const handleClear = useCallback(() => deleteAttachment(attachmentId), []);

    return (
        <IconButton onClick={handleClear} sx={IconButtonSx}>
            <ClearIcon sx={{ fontSize: "15px" }} />
        </IconButton>
    );
};

// --------------------------------------------------------------

interface AttachmentProps {
    a: IKanbanAttachment;
}

const Attachment: FC<AttachmentProps> = ({ a }) => {
    console.log("a.id: ", a.id, " ", a.cdnUrl);

    return (
        <Box position="relative" sx={ImageSx}>
            <DeleteButton attachmentId={a.id} />

            {a.cdnUrl ? (
                <Image
                    src={`https://${a.cdnUrl}`}
                    alt=""
                    width={0}
                    height={0}
                    objectFit="contain"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "16px",
                    }}
                />
            ) : (
                <PreviewImage width={30} height={30} />
            )}
        </Box>
    );
};

// --------------------------------------------------------------

const getAttachment = (a: IKanbanAttachment) => <Attachment key={a.id} a={a} />;

// --------------------------------------------------------------

interface ViewProps {
    cardId: number;
}

const View: FC<ViewProps> = ({ cardId }) => {
    const { data: attachments, isLoading } = useGetAttachmentsQuery(cardId);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {attachments?.map(getAttachment)}
        </Stack>
    );
};

export default View;
