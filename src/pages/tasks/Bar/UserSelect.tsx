import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import AvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { FC, useCallback } from "react";
import { SxProps, Theme } from "@mui/material";

// -------------------------------------------------------------------

const AvatarSx: SxProps<Theme> = {
    border: "2px solid",
    borderColor: "transparent",
    cursor: "pointer",
    "&:hover": {
        borderColor: "info.main",
        zIndex: 1000,
        boxShadow: 15,
    },
};

interface AvatarProps extends Omit<MuiAvatarProps, "onClick"> {
    u: IUser;
    onClick: (id: number) => void;
}

const Avatar: FC<AvatarProps> = ({ u, onClick, ...props }) => {
    const handleClick = useCallback(() => onClick(u.id), []);
    return (
        <MuiAvatar
            src={u.profilePhoto}
            onClick={handleClick}
            sx={AvatarSx}
            {...props}
        />
    );
};

// -------------------------------------------------------------------

const getAvatar = (onClick: (id: number) => void) => (u: IUser) =>
    <Avatar key={u.id} u={u} onClick={onClick} />;

// -------------------------------------------------------------------

const UserSelect = () => {
    const { data } = useAllUsersQuery();

    const handleClick = (id: number) => {};

    return (
        <AvatarGroup max={data?.length || 4}>
            {data?.map(getAvatar(handleClick))}
        </AvatarGroup>
    );
};

export default UserSelect;
