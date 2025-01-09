import { LAYOUT } from "@/config";
import useDialog from "@/hooks/useDialog";
import Fab from "@mui/material/Fab";
import dynamic from "next/dynamic";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import { SxProps, Theme } from "@mui/material";
const Popover = dynamic(() => import("./Popover"));

const FabSx: SxProps<Theme> = {
    position: "fixed",
    bottom: LAYOUT.FAB_OFFSET_BOTTOM,
    right: 30,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.45)",
};

const FabMenu = () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openMenu, closeMenu] = useDialog();

    return (
        <>
            <Fab color="primary" sx={FabSx} ref={anchorRef} onClick={openMenu}>
                <AddIcon />
            </Fab>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

export default FabMenu;
