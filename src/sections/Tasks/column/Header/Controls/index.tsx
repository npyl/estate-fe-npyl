import useDialog from "@/hooks/useDialog";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Menu = dynamic(() => import("./Menu"));

const Controls = () => {
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
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

export default Controls;
