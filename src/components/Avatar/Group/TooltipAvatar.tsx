import Avatar, { AvatarProps } from "@/components/Avatar";
import { forwardRef, useCallback } from "react";
import { Tooltip } from "@mui/material";
import { getAvatarSx } from "./style";
import { TUser } from "../types";

interface TooltipAvatarProps<T extends TUser = TUser>
    extends Omit<AvatarProps, "onClick"> {
    u: T;
    selected?: boolean;
    onClick?: (id: T["id"]) => void;
}

const TooltipAvatar = forwardRef<HTMLDivElement, TooltipAvatarProps>(
    ({ u, selected = false, onClick, sx, ...props }, ref) => {
        const handleClick = useCallback(() => onClick?.(u.id), [u.id, onClick]);

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

export default TooltipAvatar;
