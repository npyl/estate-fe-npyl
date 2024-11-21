import Box from "@mui/material/Box";
import { FC, useCallback } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { SxProps, Theme } from "@mui/material";
import { useDeleteAttachmentMutation } from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import PreviewImage from "@/components/image/PreviewImage";
import { useAttachmentsContext } from "../AttachmentsContext";

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

export default Attachment;
