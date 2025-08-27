import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Box, SxProps, Theme } from "@mui/material";
import { IPropertyImage } from "@/types/file";
import RejectionFiles from "@/components/upload/errors/RejectionFiles";
import ImagePreview from "./ImagePreview";
import { useImageOperations } from "../context/ImageOperations";
import StyledDropZone from "./styled";
import Placeholder from "./Placeholder";
import { FC } from "react";
import breakPromise from "@/utils/breakPromise";

export interface UploadProps extends Omit<DropzoneOptions, "disabled"> {
    error?: boolean;
    multiple?: boolean;
    sx?: SxProps<Theme>;
    files?: IPropertyImage[];
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;

    onImageClick: (key: string) => void;
}

// ----------------------------------------------------------------------

const UploadImages: FC<UploadProps> = ({
    multiple = true,
    error,
    helperText,
    placeholder,
    //
    files,
    onImageClick,
    sx,
    ...other
}) => {
    const { upload, isLoading } = useImageOperations();

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
    } = useDropzone({
        multiple,
        disabled: isLoading,
        accept: {
            "image/jpeg": ["jpeg", "jpg"],
            "image/png": ["png"],
        },
        onDrop: breakPromise(upload),
        ...other,
    });

    const hasFiles = files && multiple && files.length > 0;
    const isError = isDragReject || !!error;

    return (
        <Box width={1} position="relative" sx={{ ...sx }}>
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
                    ...(isLoading && {
                        opacity: 0.48,
                        pointerEvents: "none",
                    }),
                }}
            >
                <input {...getInputProps()} />

                <Placeholder />
            </StyledDropZone>

            <RejectionFiles fileRejections={fileRejections} />

            {hasFiles && (
                <ImagePreview
                    mt={1}
                    images={files}
                    onImageClick={onImageClick}
                    placeholder={placeholder}
                />
            )}

            {helperText}
        </Box>
    );
};

export default UploadImages;
