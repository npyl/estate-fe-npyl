/**
 * AvatarGroup with select capability
 */

import AvatarGroup, { AvatarGroupProps } from "@mui/material/AvatarGroup";
import Avatar, { AvatarProps } from "@/components/Avatar";
import { FC, forwardRef, useCallback } from "react";
import { SxProps, Theme, Tooltip } from "@mui/material";

type ObjectWithId = { id: number | string };
type TUser = ObjectWithId & {
    avatar: string;
    firstName: string;
    lastName: string;
};

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

    "&.MuiAvatarGroup-avatar": {
        borderWidth: "3px",
        ...(selected ? SelectedSx : {}),
    },
});

interface TooltipAvatarProps<T extends TUser = TUser>
    extends Omit<AvatarProps, "onClick"> {
    u: T;
    selected: boolean;
    onClick: (id: T["id"]) => void;
}

const TooltipAvatar = forwardRef<HTMLDivElement, TooltipAvatarProps>(
    ({ u, selected, onClick, sx, ...props }, ref) => {
        const handleClick = useCallback(() => onClick(u.id), [u.id, onClick]);

        return (
            <Tooltip title={`${u?.firstName || "-"} ${u?.lastName || "-"}`}>
                <Avatar
                    ref={ref}
                    src={u.avatar}
                    firstName={u?.firstName}
                    lastName={u?.lastName}
                    onClick={handleClick}
                    sx={getAvatarSx(selected)}
                    {...props}
                />
            </Tooltip>
        );
    }
);

TooltipAvatar.displayName = "TooltipAvatar";

// -------------------------------------------------------------------

const getAvatar =
    <T extends TUser = TUser>(
        clickedId: T["id"] | undefined,
        onClick: (id: T["id"]) => void
    ) =>
    (u: T) =>
        (
            <TooltipAvatar
                key={u.id}
                u={u}
                selected={u.id === clickedId}
                onClick={onClick}
            />
        );

// -------------------------------------------------------------------

interface AvatarSelectGroupProps<T extends TUser = TUser>
    extends Omit<AvatarGroupProps, "value" | "onChange"> {
    users?: T[];
    value?: T["id"];
    onChange: (v: T["id"]) => void;
}

const AvatarSelectGroup: FC<AvatarSelectGroupProps> = ({
    users,
    value,
    onChange,
    children,
    ...props
}) => (
    <AvatarGroup {...props}>
        {users?.map(getAvatar(value, onChange))}
        {children}
    </AvatarGroup>
);

export default AvatarSelectGroup;
