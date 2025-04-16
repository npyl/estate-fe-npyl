// UploadAttachment.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { styled, alpha } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

interface UploadAttachmentProps {
    disabled?: boolean;
    onDropAccepted: (files: File[]) => void;
}
import { useTranslation } from "react-i18next";
import { UploadIllustration } from "@/assets/illustrations";

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
                <Stack
                    alignItems="center"
                    gap={1}
                    direction="row"
                    justifyContent={"center"}
                >
                    <UploadIllustration sx={{ width: 80 }} />
                    {/* <Typography variant="body1"> */}
                    <Box
                        component="span"
                        sx={{
                            fontWeight: "600",
                            cursor: "pointer",
                            fontSize: 20,
                        }}
                    >
                        {t("Drop or Select files")}
                    </Box>{" "}
                </Stack>
            </StyledDropZone>
        </Box>
    );
};

export default UploadTaskAttachment;
