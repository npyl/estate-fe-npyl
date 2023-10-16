import { useDropzone } from "react-dropzone";
// @mui
import {
    Box,
    Stack,
    Button,
    IconButton,
    Typography,
    StackProps,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
// assets
import { UploadIllustration } from "../../assets/illustrations";
//
import Iconify from "../iconify";
//
import { UploadPropertyImageProps } from "./types";
import RejectionFiles from "./errors/RejectionFiles";
import MultiFilePreviewReorder from "./preview/MultiFilePreviewReorder";
import SingleFilePreview from "./preview/SingleFilePreview";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

// ----------------------------------------------------------------------

export const StyledDropZone = styled("div")(({ theme }) => ({
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

export default function UploadDnd({
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
    const hasFiles = files && multiple && files.length > 0;
    const isError = isDragReject || !!error;

    return (
        <Box sx={{ width: 1, ...sx }}>
            <StyledDropZone
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
                    maxHeight: 300,
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
            </StyledDropZone>

            <RejectionFiles fileRejections={fileRejections} />

            {hasFile && onDelete && (
                <IconButton
                    size="small"
                    onClick={onDelete}
                    sx={{
                        top: 16,
                        right: 16,
                        zIndex: 9,
                        position: "absolute",
                        color: (theme) =>
                            alpha(theme.palette.common.white, 0.8),
                        bgcolor: (theme) =>
                            alpha(theme.palette.grey[900], 0.72),
                        "&:hover": {
                            bgcolor: (theme) =>
                                alpha(theme.palette.grey[900], 0.48),
                        },
                    }}
                >
                    <Iconify icon="eva:close-fill" width={18} />
                </IconButton>
            )}

            {hasFiles && (
                <>
                    <Box
                        sx={{
                            mt: 1,
                            overflowY: "auto",
                        }}
                    >
                        <MultiFilePreviewReorder
                            files={files}
                            thumbnail={false}
                            setFiles={setFiles}
                            onImageClick={onImageClick}
                            onReorder={onReorder}
                            onRemove={onRemove}
                        />
                    </Box>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1.5}
                    >
                        {onRemoveAll && (
                            <Button
                                color="inherit"
                                variant="outlined"
                                size="small"
                                onClick={onRemoveAll}
                            >
                                {t("Remove all")}
                            </Button>
                        )}

                        {onUpload && (
                            <Button
                                size="small"
                                variant="contained"
                                onClick={onUpload}
                            >
                                {t("Upload files")}
                            </Button>
                        )}
                    </Stack>
                </>
            )}

            {helperText && helperText}
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
            direction={{
                xs: "column",
                md: "row",
            }}
            sx={{
                width: 1,
                textAlign: {
                    xs: "center",
                    md: "left",
                },
                ...sx,
            }}
            {...other}
        >
            <UploadIllustration sx={{ width: 200 }} />

            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant="h5">
                    {t("Drop or Select file")}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <Typography variant="body2" component="span">
                        {t(
                            "Drop files here or click browse  thorough your machine"
                        )}
                    </Typography>
                </Typography>
            </Box>
        </Stack>
    );
}
