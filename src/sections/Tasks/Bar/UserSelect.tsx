import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import AvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import { FC, useCallback } from "react";
import { SxProps, Theme, Tooltip } from "@mui/material";
import { useFiltersContext } from "@/sections/Tasks/filters";

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

    const initials = u?.firstName[0] + u?.lastName[0];

    return (
        <Tooltip title={`${u?.firstName} ${u?.lastName}`}>
            <MuiAvatar
                src={u.avatar}
                onClick={handleClick}
                sx={getAvatarSx(selected)}
                {...props}
            >
                {initials}
            </MuiAvatar>
        </Tooltip>
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

    const { assigneeId, setAssigneeId } = useFiltersContext();

    return (
        <AvatarGroup max={data?.length || 4}>
            {data?.map(getAvatar(assigneeId, setAssigneeId))}
        </AvatarGroup>
    );
};

export default UserSelect;
