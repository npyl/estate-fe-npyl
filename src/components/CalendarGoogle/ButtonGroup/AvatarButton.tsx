import { useAuth } from "@/hooks/use-auth";
import useDialog from "@/hooks/useDialog";
import { useLogoutMutation } from "@/services/calendar";
import { GoogleCalendarUserInfo } from "@/types/calendar/google";
import { Divider, Menu, MenuItem, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    name: string;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, name, onClose }) => {
    const { t } = useTranslation();

    const { user } = useAuth();
    const [logout] = useLogoutMutation();

    const handleLogout = () => logout(user?.id!);

    return (
        <Menu open anchorEl={anchorEl} onClose={onClose}>
            <Typography px={1} mb={1} fontWeight="bold" textAlign="center">
                {name}
            </Typography>
            <Divider />
            <MenuItem onClick={handleLogout}>{t("Logout")}</MenuItem>
        </Menu>
    );
};

// ---------------------------------------------------------

const AvatarSx = {
    height: "30px",
    width: "30px",
};

interface Props extends IconButtonProps {
    userInfo?: GoogleCalendarUserInfo;
}

const AvatarButton: FC<Props> = ({ userInfo, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={ref} onClick={openPopover} {...props}>
                <Avatar src={userInfo?.picture} sx={AvatarSx} />
            </IconButton>

            {isOpen && ref.current ? (
                <Popover
                    anchorEl={ref.current}
                    name={userInfo?.name || "-"}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default AvatarButton;
