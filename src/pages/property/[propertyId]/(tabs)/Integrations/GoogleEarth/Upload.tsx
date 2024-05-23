import { useDropzone } from "react-dropzone";
// @mui
import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
//
import { UploadProps } from "./types";
import Placeholder from "src/components/upload/placeholder";
import MultiFilePreview from "src/components/upload/preview/MultiFilePreview";

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
    onFileClick,
    onDelete,
    //
    files,
    thumbnail,
    onUpload,
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

        ...other,
    });

    const isError = isDragReject || !!error;
    const hasFiles = files?.length && files?.length > 0;

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

            {hasFiles ? (
                <MultiFilePreview
                    files={files}
                    variant="googleEarth"
                    thumbnail={false}
                />
            ) : null}

            {helperText && helperText}
        </Box>
    );
}
