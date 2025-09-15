import { ChangeEvent, FC, useCallback } from "react";
import FileInput from "@/components/FileInput";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/file";
import { errorToast } from "@/components/Toaster";
import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import Image, { ImageProps } from "@/components/image";
import Placeholder from "@/components/upload/placeholder";

// ----------------------------------------------------------------------------

const OverlayImageSx: SxProps<Theme> = {
    "&:hover": {
        bgcolor: ({ palette: { mode } }) =>
            mode === "light" ? "background.neutral" : "neutral.800",
    },
};

interface OverlayImageProps extends Omit<ImageProps, "ref" | "sx" | "onClick"> {
    ContainerProps?: Omit<StackProps, "children">;
    loading?: boolean;
    onClick: VoidFunction;
    onDelete: VoidFunction;
}

const OverlayImage: FC<OverlayImageProps> = ({
    src,
    loading,
    onClick,
    onDelete,
    ContainerProps,
    ...props
}) => {
    const { sx, ...other } = ContainerProps || {};

    return (
        <Stack
            position="relative"
            height={1}
            borderRadius={1}
            sx={{ ...OverlayImageSx, ...sx }}
            onClick={onClick}
            {...other}
        >
            {!src && !loading ? (
                <Placeholder position="absolute" height={1} />
            ) : null}

            {src && !loading ? <Image src={src} {...props} /> : null}
        </Stack>
    );
};

// -----------------------------------------------------------------------------------------

const hasAllowedSize = (f: File) => f.size < MAX_FILE_SIZE;

interface ImagePickerProps
    extends Omit<OverlayImageProps, "onClick" | "onSelect" | "onDelete"> {
    isLoading?: boolean;
    multiple?: boolean;
    onSelect: (f: File[]) => void;
    onDelete: VoidFunction;
}

const ImagePicker: FC<ImagePickerProps> = ({
    isLoading = false,
    multiple = false,
    onSelect,
    onDelete,
    ...props
}) => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files ? Array.from(e.target.files) : [];

            if (!files.every(hasAllowedSize)) {
                errorToast("Every image should have size <3MB");
                return;
            }

            onSelect(files);
        },
        [onSelect]
    );

    return (
        <FileInput
            multiple={multiple}
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
