import FileInput from "@/components/FileInput";
import { ChangeEvent, FC, useCallback } from "react";
import Avatar, { AvatarProps } from "@/components/Avatar";
import {
    alpha,
    Box,
    CircularProgress,
    IconButton,
    Stack,
    SxProps,
    Theme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { errorToast } from "@/components/Toaster";

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

const AvatarSx: SxProps<Theme> = {
    border: "3px solid",
    borderColor: "transparent",
    "&:hover": {
        borderColor: "info.main",
    },
    height: AVATAR_H,
    width: AVATAR_W,
    cursor: "pointer",
};

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

interface OverlayAvatarProps extends Omit<AvatarProps, "onClick"> {
    loading?: boolean;
    onClick: VoidFunction;
    onDelete: VoidFunction;
}

const OverlayAvatar: FC<OverlayAvatarProps> = ({
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

        <Avatar
            sx={{ ...AvatarSx, ...sx }}
            src={src}
            onClick={onClick}
            {...props}
        />
    </Box>
);

// ----------------------------------------------------------------------------

const ACCEPTED_FILE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.jfif";
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

interface AvatarPickerProps
    extends Omit<OverlayAvatarProps, "onClick" | "onSelect" | "onDelete"> {
    userId: number;
    isLoading: boolean;
    onSelect: (f: File) => void;
    onDelete: VoidFunction;
}

const AvatarPicker: FC<AvatarPickerProps> = ({
    userId,
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
        [userId]
    );

    return (
        <FileInput
            disabled={isLoading}
            accept={ACCEPTED_FILE_TYPES}
            Opener={(openerProps) => (
                <OverlayAvatar
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

export default AvatarPicker;
