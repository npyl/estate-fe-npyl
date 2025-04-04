// UploadAttachment.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { styled, alpha } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

interface UploadAttachmentProps {
    disabled?: boolean;
    onDropAccepted: (files: File[]) => void;
}
import UploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { useTranslation } from "react-i18next";

const StyledDropZone = styled("div")(({ theme }) => ({
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    border: `2px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    "&:hover": {
        opacity: 0.72,
    },
}));

const UploadTaskAttachment = ({
    onDropAccepted,
    disabled,
}: UploadAttachmentProps) => {
    const { t } = useTranslation();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onDropAccepted(acceptedFiles);
        },
        [onDropAccepted]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled,
        multiple: true,
        accept: {
            "image/*": [],
            "application/pdf": [],
        },
    });

    return (
        <Box sx={{ mb: 2 }}>
            <StyledDropZone {...getRootProps()}>
                <input {...getInputProps()} />
                <Stack alignItems="center" spacing={0.5} pb={1}>
                    <UploadIcon sx={{ fontSize: 30, color: "primary.main" }} />
                    <Typography variant="body2">
                        <Box
                            component="span"
                            sx={{
                                color: "primary.main",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            {t("Click to upload")}
                        </Box>{" "}
                        {t("or drag and drop")}
                    </Typography>
                </Stack>
            </StyledDropZone>
        </Box>
    );
};

export default UploadTaskAttachment;
