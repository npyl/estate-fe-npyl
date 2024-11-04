import { SpaceBetween } from "@/components/styled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FC, MouseEvent, useCallback, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
const Menu = dynamic(() => import("./Menu"));

const MenuButton = () => {
    const anchorRef = useRef(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    const handleClick = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        openMenu();
    }, []);

    return (
        <>
            <IconButton ref={anchorRef} onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

const AvatarSx = {
    height: "35px",
    width: "35px",
};

interface HeaderProps {
    assignee: IUser;
    completed: boolean;
}

const Header: FC<HeaderProps> = ({ assignee, completed }) => {
    const name = `${assignee?.firstName[0]}${assignee?.lastName[0]}`;

    return (
        <SpaceBetween alignItems="center">
            <Avatar sx={AvatarSx}>{name}</Avatar>{" "}
            <Stack spacing={1} direction="row" alignItems="center">
                {completed ? <CheckIcon color="success" /> : null}
                <MenuButton />
            </Stack>
        </SpaceBetween>
    );
};

export default Header;
