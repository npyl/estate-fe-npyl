import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";
import { useLogoutMutation } from "@/services/calendar";
import { GoogleCalendarUserInfo } from "@/types/calendar/google";
import { Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { FC, useRef } from "react";

// ---------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => {
    const { user } = useAuth();
    const [logout] = useLogoutMutation();

    const handleLogout = () => logout(user?.id!);

    return (
        <Menu open anchorEl={anchorEl} onClose={onClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
};

// ---------------------------------------------------------

const AvatarSx = {
    height: "30px",
    width: "30px",
};

interface Props {
    userInfo?: GoogleCalendarUserInfo;
}

const AvatarButton: FC<Props> = ({ userInfo }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={ref} onClick={openPopover}>
                <Avatar src={userInfo?.picture} sx={AvatarSx} />
            </IconButton>

            {isOpen && ref.current ? (
                <Popover anchorEl={ref.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default AvatarButton;
