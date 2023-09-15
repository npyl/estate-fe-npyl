import { useDropzone } from "react-dropzone";
// @mui
import { Box, Stack, Typography, StackProps } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// assets
import { UploadIllustration } from "../../assets/illustrations";
import { UploadPropertyImageProps } from "./types";
import SingleFilePreview from "./preview/SingleFilePreview";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

// ----------------------------------------------------------------------

export const OnlyStyledDropZone = styled("div")(({ theme }) => ({
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("padding"),
    backgroundColor: theme.palette.background.paper, // TODO: neutral
    border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
    "&:hover": {
        opacity: 0.72,
    },
}));

// ----------------------------------------------------------------------

export default function OnlyStyledUploadDnd({
    disabled,
    multiple = false,
    error,
    helperText,
    //
    file,
    setFiles,
    onDelete,
    //
    files,
    thumbnail,
    onImageClick,
    onReorder,
    onUpload,
    onRemove,
    onRemoveAll,
    sx,
    ...other
}: UploadPropertyImageProps) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        multiple,
        disabled,
        ...other,
    });

    const { t } = useTranslation();

    const hasFile = !!file && !multiple;

    const isError = isDragReject || !!error;

    return (
        <Box sx={{ width: 1, position: "relative", ...sx }}>
            <OnlyStyledDropZone
                {...getRootProps()}
                sx={{
                    ...(isDragActive && {
                        opacity: 0.72,
                    }),
                    ...(isError && {
                        color: "error.main",
                        bgcolor: "error.lighter",
                        borderColor: "error.light",
                    }),
                    ...(disabled && {
                        opacity: 0.48,
                        pointerEvents: "none",
                    }),
                    ...(hasFile && {
                        padding: "12% 0",
                    }),
                }}
            >
                <input {...getInputProps()} />

                <Placeholder
                    sx={{
                        ...(hasFile && {
                            opacity: 0,
                        }),
                    }}
                />

                {hasFile && <SingleFilePreview file={file} />}
            </OnlyStyledDropZone>
        </Box>
    );
}

// ----------------------------------------------------------------------

function Placeholder({ sx, ...other }: StackProps) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            direction="column" // Changed to "column" to ensure the Box appears above the Illustration on all screen sizes
            sx={{
                width: 1,
                height: "50%", // Set the height to half of its parent container
                textAlign: "center",
                ...sx,
            }}
            {...other}
        >
            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant="h5">
                    {t("Drop or Select file")}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <Typography variant="body2" component="span">
                        {t(
                            "Drop files here or click browse thorough your machine"
                        )}
                    </Typography>
                </Typography>
            </Box>

            <UploadIllustration sx={{ width: 200 }} />
        </Stack>
    );
}
