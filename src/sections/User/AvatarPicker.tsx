import FileInput from "@/components/FileInput";
import { ChangeEvent, FC } from "react";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { Box, IconButton, SxProps, Theme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------------

const AvatarSx: SxProps<Theme> = {
    border: "3px solid",
    borderColor: "transparent",
    "&:hover": {
        borderColor: "info.main",
    },
    height: "100px",
    width: "100px",
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
    onClick: VoidFunction;
    onDelete: VoidFunction;
}

const Avatar: FC<AvatarProps> = ({
    src,
    initials,
    sx,
    onClick,
    onDelete,
    ...props
}) => (
    <Box position="relative">
        {src ? (
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

interface AvatarPickerProps {
    profilePhoto?: string;
    initials: string;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ profilePhoto, initials }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    };

    const handleDelete = () => {};

    return (
        <FileInput
            // disabled=
            Opener={(props) => (
                <Avatar
                    src={profilePhoto}
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
