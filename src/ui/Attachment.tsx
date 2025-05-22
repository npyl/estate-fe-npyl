import Box from "@mui/material/Box";
import { FC, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack, styled, SxProps, Theme, Typography } from "@mui/material";
import DocumentIcon from "@/components/upload/preview/DocumentIcon";
import Image from "@/components/image";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("@/ui/ViewerDialog"));
const Lightbox = dynamic(() => import("@/components/Lightbox"));

type AnyId = string | number;

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
    attachmentId: AnyId;
    onDelete: (id: AnyId) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ attachmentId, onDelete }) => {
    const onClick = useCallback(() => onDelete(attachmentId), [attachmentId]);

    return (
        <IconButton onClick={onClick} sx={IconButtonSx}>
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
    mimeType: string;
    filename: string;
}

const View: FC<ViewProps> = ({ url, filename, mimeType }) => {
    const [isLightboxOpen, openLightbox, closeLightbox] = useDialog();
    const [isPDFViewerOpen, openPDFViewer, closePDFViewer] = useDialog();

    if (mimeType === "application/pdf") {
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
                        url={url}
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
                src={url}
                alt=""
                onClick={openLightbox}
            />

            {isLightboxOpen ? (
                <Lightbox open images={[{ url }]} onClose={closeLightbox} />
            ) : null}
        </>
    );
};

// --------------------------------------------------------------

interface PPAttachment {
    id: AnyId;
    url: string;
    mimeType: string;
    filename: string;
}

interface AttachmentProps<A extends PPAttachment = PPAttachment> {
    a: A;
    onDelete?: (id: AnyId) => void;
}

const Attachment: FC<AttachmentProps> = ({
    a: { id, url, mimeType, filename },
    onDelete,
}) => (
    <Box position="relative">
        {onDelete ? (
            <DeleteButton attachmentId={id} onDelete={onDelete} />
        ) : null}
        <View url={url} mimeType={mimeType} filename={filename} />
    </Box>
);

export default Attachment;
