import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar, { AvatarProps } from "@/components/Avatar";
import { forwardRef, useCallback } from "react";
import { SxProps, Theme, Tooltip } from "@mui/material";
import { useFiltersContext } from "@/sections/Tasks/filters";
import ToggleButton from "@mui/material/ToggleButton";
import ClearIcon from "@mui/icons-material/Clear";
import { MouseEvent } from "react";

// -------------------------------------------------------------------

const ClearButton = () => {
    const { setAssigneeId } = useFiltersContext();

    const handleClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setAssigneeId(undefined);
    }, []);

    return (
        <ToggleButton
            value=""
            onClick={handleClear}
            size="small"
            sx={{
                ml: 1,
                px: 1.3,
                borderRadius: "100%",
            }}
        >
            <ClearIcon />
        </ToggleButton>
    );
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

interface TooltipAvatarProps extends Omit<AvatarProps, "onClick"> {
    u: IUser;
    selected: boolean;
    onClick: (id: number) => void;
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

TooltipAvatar.displayName = "TooltipAvatar"; // Add display name for React DevTools

// -------------------------------------------------------------------

const getAvatar =
    (clickedId: number | undefined, onClick: (id: number) => void) =>
    (u: IUser) =>
        (
            <TooltipAvatar
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

    const max = (data?.length && data.length + 1) ?? 4;

    return (
        <AvatarGroup max={max}>
            {data?.map(getAvatar(assigneeId, setAssigneeId))}
            {assigneeId !== undefined ? <ClearButton /> : null}
        </AvatarGroup>
    );
};

export default UserSelect;
