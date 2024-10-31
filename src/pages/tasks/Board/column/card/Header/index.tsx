import { SpaceBetween } from "@/components/styled";
import Assignees from "./Assignees";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FC, MouseEvent, useCallback, useMemo, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { IUser } from "@/types/user";
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
}

const Header: FC<HeaderProps> = ({ assignees }) => {
    const names = useMemo(() => assignees?.map(getName), [assignees]);

    return (
        <SpaceBetween alignItems="center">
            <Assignees names={names} />
            <MenuButton />
        </SpaceBetween>
    );
};

export default Header;
