import Box from "@mui/material/Box";
import { FC, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack, styled, SxProps, Theme, Typography } from "@mui/material";
import { useDeleteAttachmentMutation } from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import { useAttachmentsContext } from "../Context";
import DocumentIcon from "@/components/upload/preview/DocumentIcon";
import Image from "@/components/image";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("@/sections/ViewerDialog"));
const Lightbox = dynamic(() => import("@/components/Lightbox"));

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
    zIndex: 1,
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

const StyledImage = styled(Image)(({ theme }) => ({
    "& img": {
        objectFit: "contain",
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.neutral?.[250]
                : theme.palette.neutral?.[800],
    },
}));

const BoxSx: SxProps<Theme> = {
    border: "2px solid transparent",
    borderRadius: "10px",
    cursor: "pointer",

    "&:hover": {
        borderColor: "info.main",
    },
};

interface ViewProps {
    url: string;
    contentType: string;
    filename: string;
}

const View: FC<ViewProps> = ({ url, filename, contentType }) => {
    const [isLightboxOpen, openLightbox, closeLightbox] = useDialog();
    const [isPDFViewerOpen, openPDFViewer, closePDFViewer] = useDialog();

    if (contentType === "application/pdf") {
        return (
            <>
                <Stack
                    gap={1}
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    bgcolor="background.paper"
                    borderRadius="12px"
                    width={180}
                    height={150}
                    sx={{
                        ...BoxSx,
                    }}
                    onClick={openPDFViewer}
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

                {isPDFViewerOpen ? (
                    <PDFViewer
                        url={`https://${url}`}
                        mimeType="application/pdf"
                        onClose={closePDFViewer}
                    />
                ) : null}
            </>
        );
    }

    return (
        <>
            <StyledImage
                containerSx={{
                    width: "180px",
                    height: "150px",
                    ...BoxSx,
                }}
                src={`https://${url}`}
                alt=""
                onClick={openLightbox}
            />

            {isLightboxOpen ? (
                <Lightbox
                    open
                    images={[{ url: `https://${url}` }]}
                    onClose={closeLightbox}
                />
            ) : null}
        </>
    );
};

// --------------------------------------------------------------

interface AttachmentProps {
    a: IKanbanAttachment;
}

const Attachment: FC<AttachmentProps> = ({ a }) => (
    <Box position="relative">
        <DeleteButton attachmentId={a.id} />
        <View
            url={a.cdnUrl}
            contentType={a.contentType}
            filename={a.filename}
        />
    </Box>
);

export default Attachment;
