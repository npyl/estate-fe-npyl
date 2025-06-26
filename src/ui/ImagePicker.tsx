import { ChangeEvent, FC, useCallback } from "react";
import FileInput from "@/components/FileInput";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/file";
import { errorToast } from "@/components/Toaster";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha, CircularProgress, Stack, SxProps, Theme } from "@mui/material";
import Image, { ImageProps } from "@/components/image";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------------

const AVATAR_H = "130px";
const AVATAR_W = AVATAR_H;

const LoadingOverlay = () => (
    <Stack
        alignItems="center"
        justifyContent="center"
        width={AVATAR_W}
        height={AVATAR_H}
        bgcolor={({ palette: { neutral } }) => alpha(neutral?.[300]!, 0.3)}
        position="absolute"
        zIndex={11}
        borderRadius="100%"
    >
        <CircularProgress />
    </Stack>
);

// ----------------------------------------------------------------------------

const DeleteButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -15,
    right: -15,
    bgcolor: "background.paper",
    "&:hover": {
        bgcolor: "background.paper",
    },
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "16px",
    zIndex: 10,
};

interface OverlayImageProps extends Omit<ImageProps, "onClick"> {
    loading?: boolean;
    onClick: VoidFunction;
    onDelete: VoidFunction;
}

const OverlayImage: FC<OverlayImageProps> = ({
    src,
    loading,
    sx,
    onClick,
    onDelete,
    ...props
}) => (
    <Box position="relative">
        {loading ? <LoadingOverlay /> : null}

        {src && !loading ? (
            <IconButton onClick={onDelete} sx={DeleteButtonSx}>
                <DeleteIcon />
            </IconButton>
        ) : null}

        <Image src={src} onClick={onClick} {...props} />
    </Box>
);

// -----------------------------------------------------------------------------------------

interface ImagePickerProps
    extends Omit<OverlayImageProps, "onClick" | "onSelect" | "onDelete"> {
    isLoading: boolean;
    onSelect: (f: File) => void;
    onDelete: VoidFunction;
}

const ImagePicker: FC<ImagePickerProps> = ({
    isLoading,
    onSelect,
    onDelete,
    ...props
}) => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (file.size > MAX_FILE_SIZE) {
                errorToast("Please upload a file of size <3MB");
                return;
            }

            onSelect(file);
        },
        [onSelect]
    );

    return (
        <FileInput
            disabled={isLoading}
            accept={ACCEPTED_FILE_TYPES}
            Opener={(openerProps) => (
                <OverlayImage
                    loading={isLoading}
                    onDelete={onDelete}
                    {...openerProps}
                    {...props}
                />
            )}
            onChange={handleChange}
        />
    );
};

export default ImagePicker;
