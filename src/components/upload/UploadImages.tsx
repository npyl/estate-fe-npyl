import { DropzoneOptions, useDropzone } from "react-dropzone";
// @mui
import {
    Box,
    Button,
    Stack,
    StackProps,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// assets
import { IPropertyImage } from "src/types/file";
import { UploadIllustration } from "../../assets/illustrations";
import RejectionFiles from "./errors/RejectionFiles";
import ImagePreview from "./preview/ImagePreview";

export interface UploadProps extends DropzoneOptions {
    error?: boolean;
    multiple?: boolean;
    sx?: SxProps<Theme>;
    files?: IPropertyImage[];
    thumbnail?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;

    //
    onImageClick?: (file: IPropertyImage) => void;
    onUpload?: VoidFunction;
    onDelete?: VoidFunction;
    onRemove?: (file: IPropertyImage) => void;
    onRemoveAll?: VoidFunction;
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

export default function UploadImages({
    disabled,
    multiple = true,
    error,
    helperText,
    placeholder,
    //
    //
    files,
    thumbnail,
    onImageClick,
    onDelete,
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
        accept: {
            "image/jpeg": ["jpeg", "jpg"],
            "image/png": ["png"],
        },
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

            {hasFiles && (
                <>
                    <Box mt={1}>
                        <ImagePreview
                            images={files}
                            onImageClick={onImageClick}
                            placeholder={placeholder}
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
                                Remove all
                            </Button>
                        )}

                        {onUpload && (
                            <Button
                                size="small"
                                variant="contained"
                                onClick={onUpload}
                            >
                                Upload files
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
