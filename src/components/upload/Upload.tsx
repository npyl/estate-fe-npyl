import { useDropzone } from "react-dropzone";
// @mui
import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
//
import { UploadProps } from "./types";
import Placeholder from "./placeholder";
import dynamic from "next/dynamic";
const MultiFilePreview = dynamic(() => import("./preview/MultiFilePreview"));
const RejectionFiles = dynamic(() => import("./errors/RejectionFiles"));

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
    files,
    onFileClick,
    onRemove,
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

    const hasFiles = files && files.length > 0;

    const isError = isDragReject || !!error;

    return (
        <Box sx={{ width: 1, position: "relative", ...sx }}>
            <StyledDropZone
                className="PPUpload-DropZone"
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

            {hasFiles ? (
                <MultiFilePreview
                    files={files}
                    variant={variant}
                    disabled={disabled}
                    onFileClick={onFileClick}
                    onRemove={onRemove}
                    my={1}
                />
            ) : null}

            {helperText}
        </Box>
    );
}
