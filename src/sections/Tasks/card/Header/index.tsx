import { SpaceBetween } from "@/components/styled";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FC, MouseEvent, useCallback, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@/components/Avatar";
const Menu = dynamic(() => import("./Menu"));

interface Props {
    taskId: number;
}

const MenuButton: FC<Props> = ({ taskId }) => {
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
                <Menu
                    taskId={taskId}
                    anchorEl={anchorRef.current}
                    onClose={closeMenu}
                />
            ) : null}
        </>
    );
};

const AvatarSx = {
    height: "35px",
    width: "35px",
};

interface HeaderProps {
    taskId: number;
    assignee: IUser;
    completed: boolean;
}

const Header: FC<HeaderProps> = ({ taskId, assignee, completed }) => (
    <SpaceBetween alignItems="center">
        <Avatar
            firstName={assignee?.firstName}
            lastName={assignee?.lastName}
            src={assignee?.avatar}
            sx={AvatarSx}
        />
        <Stack spacing={1} direction="row" alignItems="center">
            {completed ? <CheckIcon color="success" /> : null}
            <MenuButton taskId={taskId} />
        </Stack>
    </SpaceBetween>
);

export default Header;
