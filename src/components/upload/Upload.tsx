import { useDropzone } from "react-dropzone";
// @mui
import { Box, Button, IconButton, Stack } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
//
import Iconify from "../iconify";
//
import RejectionFiles from "./errors/RejectionFiles";
import MultiFilePreview from "./preview/MultiFilePreview";
import { UploadProps } from "./types";
import Placeholder from "./placeholder";

// ----------------------------------------------------------------------

const StyledDropZone = styled("div")(({ theme }) => ({
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

export default function Upload({
    disabled,
    multiple = false,
    error,
    helperText,
    variant = "image",
    //
    file,
    onFileClick,
    onDelete,
    //
    files,
    onRemove,
    onRemoveAll,
    sx,
    ...other
}: UploadProps) {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        multiple,
        disabled,
        accept:
            variant === "image"
                ? {
                      "image/jpeg": ["jpeg", "jpg"],
                      "image/png": ["png"],
                  }
                : {
                      "application/pdf": ["pdf"],
                  },
        ...other,
    });

    const hasFile = !!file && !multiple;

    const hasFiles = files && multiple && files.length > 0;

    const isError = isDragReject || !!error;

    return (
        <Box sx={{ width: 1, position: "relative", ...sx }}>
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
                }}
            >
                <input {...getInputProps()} />

                <Placeholder />
            </StyledDropZone>

            <RejectionFiles fileRejections={fileRejections} />

            {hasFile && onDelete && (
                <IconButton
                    size="small"
                    disabled={disabled}
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
                    <MultiFilePreview
                        files={files}
                        variant={variant}
                        disabled={disabled}
                        onFileClick={onFileClick}
                        onRemove={onRemove}
                        my={1}
                    />

                    {onRemoveAll ? (
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={1.5}
                        >
                            <Button
                                color="inherit"
                                variant="outlined"
                                size="small"
                                onClick={onRemoveAll}
                                disabled={disabled}
                            >
                                Remove all
                            </Button>
                        </Stack>
                    ) : null}
                </>
            )}

            {helperText}
        </Box>
    );
}
