import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Skeleton, SxProps, Theme } from "@mui/material";
import {
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import { attachmentsKey } from "./_constants";

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
    const { watch, setValue } = useFormContext();

    const [deleteAttachment] = useDeleteAttachmentMutation();

    const handleClear = useCallback(async () => {
        try {
            await deleteAttachment(attachmentId);

            const attachments = (watch(attachmentsKey) as number[]) || [];

            setValue(
                attachmentsKey,
                attachments?.filter((id) => id !== attachmentId),
                { shouldDirty: true }
            );
        } catch (ex) {}
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

const Attachment: FC<AttachmentProps> = ({ a }) => (
    <Box position="relative" sx={ImageSx}>
        <DeleteButton attachmentId={a.id} />

        <Image
            src={a.cdnUrl}
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
    </Box>
);

// --------------------------------------------------------------

const getAttachment = (a: IKanbanAttachment) => <Attachment key={a.id} a={a} />;

// --------------------------------------------------------------

interface AttachmentsProps {
    cardId?: number;
}

const Attachments: FC<AttachmentsProps> = ({ cardId }) => {
    const { data: attachments, isLoading } = useGetAttachmentsQuery(cardId!, {
        skip: cardId === undefined,
    });

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    // TODO: no attachments message ?

    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {attachments?.map(getAttachment)}
        </Stack>
    );
};

export default Attachments;
