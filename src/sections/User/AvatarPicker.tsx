import FileInput from "@/components/FileInput";
import { ChangeEvent, FC, useCallback } from "react";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
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
import {
    useRemoveAvatarMutation,
    useUploadAvatarMutation,
} from "@/services/user";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

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

interface AvatarProps extends Omit<MuiAvatarProps, "onClick"> {
    initials: string;
    loading?: boolean;
    onClick: VoidFunction;
    onDelete: VoidFunction;
}

const Avatar: FC<AvatarProps> = ({
    src,
    initials,
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

        <MuiAvatar
            sx={{ ...AvatarSx, ...sx }}
            src={src}
            onClick={onClick}
            {...props}
        >
            {initials}
        </MuiAvatar>
    </Box>
);

// ----------------------------------------------------------------------------

const ACCEPTED_FILE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.jfif";
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

interface AvatarPickerProps {
    avatar?: string;
    initials: string;
    userId: number;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ avatar, userId, initials }) => {
    const { t } = useTranslation();

    const [uploadAvatar, { isLoading: isUploading }] =
        useUploadAvatarMutation();
    const [removeAvatar, { isLoading: isRemoving }] = useRemoveAvatarMutation();

    const isLoading = isUploading || isRemoving;

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (file.size > MAX_FILE_SIZE) {
                toast.error(t("Please upload a file of size <3MB"));
                return;
            }

            uploadAvatar({ file, userId });
        },
        [userId]
    );

    const handleDelete = useCallback(() => removeAvatar(userId), [userId]);

    return (
        <FileInput
            disabled={isLoading}
            accept={ACCEPTED_FILE_TYPES}
            Opener={(props) => (
                <Avatar
                    loading={isLoading}
                    src={avatar}
                    initials={initials}
                    {...props}
                    onDelete={handleDelete}
                />
            )}
            onChange={handleChange}
        />
    );
};

export default AvatarPicker;
