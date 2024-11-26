import Box from "@mui/material/Box";
import { FC, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { useDeleteAttachmentMutation } from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import { useAttachmentsContext } from "../AttachmentsContext";
import DocumentIcon from "@/components/upload/preview/DocumentIcon";

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
};

interface DeleteButtonProps {
    attachmentId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ attachmentId }) => {
    const { setAttachments } = useAttachmentsContext();

    const [deleteAttachment] = useDeleteAttachmentMutation();

    const handleClear = useCallback(async () => {
        await deleteAttachment(attachmentId);
        setAttachments((old) => old?.filter(({ id }) => id !== attachmentId));
    }, []);

    return (
        <IconButton onClick={handleClear} sx={IconButtonSx}>
            <ClearIcon sx={{ fontSize: "15px" }} />
        </IconButton>
    );
};

// --------------------------------------------------------------

interface ViewProps {
    url: string;
    contentType: string;
    filename: string;
}

const View: FC<ViewProps> = ({ url, filename, contentType }) => {
    console.log("view: ", contentType);

    if (contentType === "application/pdf") {
        return (
            <Stack
                gap={1}
                alignItems="center"
                justifyContent="center"
                bgcolor="background.paper"
                borderRadius="16px"
                width={180}
                height={150}
                sx={{
                    cursor: "pointer",
                }}
            >
                <DocumentIcon isPreview={false} />

                <Typography
                    textOverflow="ellipsis"
                    overflow="hidden"
                    width={1}
                    px={3}
                    variant="body2"
                >
                    {filename}
                </Typography>
            </Stack>
        );
    }

    return (
        <img
            src={`https://${url}`}
            alt=""
            width={180}
            height={150}
            style={{
                borderRadius: "16px",
            }}
        />
    );
};

// --------------------------------------------------------------

interface AttachmentProps {
    a: IKanbanAttachment;
}

const Attachment: FC<AttachmentProps> = ({ a }) => (
    <Box position="relative" sx={ImageSx}>
        <DeleteButton attachmentId={a.id} />
        <View
            url={a.cdnUrl}
            contentType={a.contentType}
            filename={a.filename}
        />
    </Box>
);

export default Attachment;
