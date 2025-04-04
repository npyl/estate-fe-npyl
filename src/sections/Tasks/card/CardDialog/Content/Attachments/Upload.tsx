// UploadAttachment.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { styled, alpha } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from "@mui/material";

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
        opacity: 0.88,
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
                <Stack
                    alignItems="center"
                    gap={1}
                    // spacing={0.5}
                    // pb={1}
                    direction="row"
                    justifyContent={"center"}
                >
                    <UploadIcon sx={{ fontSize: 26, color: "primary.main" }} />
                    <Typography variant="body2">
                        <Box
                            component="span"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            {t("Drop files to attach or")}
                        </Box>{" "}
                        <Button
                            variant="outlined"
                            sx={{
                                ml: 0.5,
                                backgroundColor: "neutral.150",
                                color: "primary.main",
                                ":hover": {
                                    backgroundColor: "neutral.200",
                                },
                            }}
                        >
                            {t("Browse")}
                        </Button>
                    </Typography>
                </Stack>
            </StyledDropZone>
        </Box>
    );
};

export default UploadTaskAttachment;
