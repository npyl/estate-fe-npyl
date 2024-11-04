import useDialog from "@/hooks/useDialog";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
const Menu = dynamic(() => import("./Menu"));

interface Props {
    columnId: number;
}

const Controls: FC<Props> = ({ columnId }) => {
    const anchorRef = useRef(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    return (
        <>
            <IconButton
                ref={anchorRef}
                className="Controls"
                size="small"
                onClick={openMenu}
            >
                <MenuIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Menu
                    columnId={columnId}
                    anchorEl={anchorRef.current}
                    onClose={closeMenu}
                />
            ) : null}
        </>
    );
};

export default Controls;
