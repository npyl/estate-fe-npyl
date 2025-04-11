import { FC, MouseEvent, useCallback, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("./Menu"));
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
interface Props {
    taskId: number;
}

const MenuButton: FC<Props> = ({ taskId }) => {
    const anchorRef = useRef(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    const handleClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openMenu();
    }, []);

    return (
        <>
            <IconButton
                className="TaskCard-HeaderControls"
                ref={anchorRef}
                onClick={handleClick}
                sx={{
                    backgroundColor: "transparent",
                    ":hover": { backgroundColor: "transparent" },
                }}
            >
                <MoreVertOutlinedIcon />
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

export default MenuButton;
