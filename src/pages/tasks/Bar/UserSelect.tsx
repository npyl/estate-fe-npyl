import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import AvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { FC, useCallback, useState } from "react";
import { SxProps, Theme } from "@mui/material";

// -------------------------------------------------------------------

const SelectedSx: SxProps<Theme> = {
    borderColor: "info.main",
    zIndex: 1000,
    boxShadow: 15,
};

const getAvatarSx = (selected: boolean): SxProps<Theme> => ({
    border: "2px solid",
    borderColor: "transparent",
    cursor: "pointer",
    "&:hover": SelectedSx,
    ...(selected ? SelectedSx : {}),
});

interface AvatarProps extends Omit<MuiAvatarProps, "onClick"> {
    u: IUser;
    selected: boolean;
    onClick: (id: number) => void;
}

const Avatar: FC<AvatarProps> = ({ u, selected, onClick, sx, ...props }) => {
    const handleClick = useCallback(() => onClick(u.id), [u.id, onClick]);

    return (
        <MuiAvatar
            src={u.avatar}
            onClick={handleClick}
            sx={getAvatarSx(selected)}
            {...props}
        />
    );
};

// -------------------------------------------------------------------

const getAvatar =
    (clickedId: number | undefined, onClick: (id: number) => void) =>
    (u: IUser) =>
        (
            <Avatar
                key={u.id}
                u={u}
                selected={u.id === clickedId}
                onClick={onClick}
            />
        );

// -------------------------------------------------------------------

const UserSelect = () => {
    const { data } = useAllUsersQuery();

    const [clickedId, setClickedId] = useState<number>();

    return (
        <AvatarGroup max={data?.length || 4}>
            {data?.map(getAvatar(clickedId, setClickedId))}
        </AvatarGroup>
    );
};

export default UserSelect;
