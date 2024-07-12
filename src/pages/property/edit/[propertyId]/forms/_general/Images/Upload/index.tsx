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
import { alpha, styled } from "@mui/material/styles";
// assets
import { IPropertyImage } from "@/types/file";
import { UploadIllustration } from "@/assets/illustrations";
import RejectionFiles from "@/components/upload/errors/RejectionFiles";
import ImagePreview from "./ImagePreview";
import usePropertyUpload from "@/hooks/property/uploadFile";
import {
    UploadFileProvider,
    useUploadFileContext,
} from "@/contexts/uploadFile";

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

const StyledDropZone = styled("div")(({ theme }) => ({
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(2, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("padding"),
    backgroundColor: theme.palette.background.paper, // TODO: neutral
    border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
    "&:hover": {
        opacity: 0.72,
    },
}));

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
    const { setUploadProgress } = useUploadFileContext();

    const { uploadFiles, isLoading } = usePropertyUpload(
        "image",
        setUploadProgress
    );

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
        onDrop: uploadFiles,
        ...other,
    });

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
                    Drop or Select files
                </Typography>
            </Box>
        </Stack>
    );
}

const UploadImagesWrapper: React.FC<UploadProps> = (props) => (
    <UploadFileProvider>
        <UploadImages {...props} />
    </UploadFileProvider>
);

export default UploadImagesWrapper;
