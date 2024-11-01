import { SpaceBetween } from "@/components/styled";
import Assignees from "./Assignees";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FC, MouseEvent, useCallback, useMemo, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
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

const getName = ({ firstName, lastName }: IUser) =>
    `${firstName?.[0]}${lastName?.[0]}`;

interface HeaderProps {
    assignees: IUser[];
    completed: boolean;
}

const Header: FC<HeaderProps> = ({ assignees, completed }) => {
    const names = useMemo(() => assignees?.map(getName), [assignees]);

    return (
        <SpaceBetween alignItems="center">
            <Assignees names={names} />
            <Stack spacing={1} direction="row" alignItems="center">
                {completed ? <CheckIcon color="success" /> : null}
                <MenuButton />
            </Stack>
        </SpaceBetween>
    );
};

export default Header;
