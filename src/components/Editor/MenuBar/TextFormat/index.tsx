import { IconButton } from "@mui/material";
import { useRef } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { RenderValue } from "./Menu";
import useCurrentValue from "./useCurrentValue";
const Menu = dynamic(() => import("./Menu"));

// -----------------------------------------------------------------------------

const TextFormatSelect = () => {
    const [isOpen, openMenu, closeMenu] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const v = useCurrentValue();

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openMenu}>
                <RenderValue mini v={v} />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

export default TextFormatSelect;
