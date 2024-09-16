import { DropzoneOptions, useDropzone } from "react-dropzone";
// @mui
import {
    Box,
    Stack,
    StackProps,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
// assets
import { IPropertyImage } from "@/types/file";
import { UploadIllustration } from "@/assets/illustrations";
import RejectionFiles from "@/components/upload/errors/RejectionFiles";
import ImagePreview from "./ImagePreview";
import { useImageOperations } from "../context/ImageOperations";
import StyledDropZone from "./styled";
import { useTranslation } from "react-i18next";

export interface UploadProps extends Omit<DropzoneOptions, "disabled"> {
    error?: boolean;
    multiple?: boolean;
    sx?: SxProps<Theme>;
    files?: IPropertyImage[];
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;

    onImageClick: (key: string) => void;
}

// ----------------------------------------------------------------------

function UploadImages({
    multiple = true,
    error,
    helperText,
    placeholder,
    //
    files,
    onImageClick,
    sx,
    ...other
}: UploadProps) {
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
        onDrop: upload,
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

            {helperText && helperText}
        </Box>
    );
}

// ----------------------------------------------------------------------

function Placeholder({ sx, ...other }: StackProps) {
    const { t } = useTranslation();
    return (
        <Stack
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
            <UploadIllustration sx={{ width: 100 }} />

            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant="h5">
                    {t("Drop or Select files")}
                </Typography>
            </Box>
        </Stack>
    );
}

export default UploadImages;
