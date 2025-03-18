import { IconButton } from "@mui/material";
import { useRef } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { RenderValue } from "./Content";
import useCurrentValue from "./useCurrentValue";
const Menu = dynamic(() => import("./Menu"));

// INFO: force constant width, height calculated by observation
const VALUE_WIDTH = 30;
const VALUE_HEIGHT = VALUE_WIDTH - 5;

const TextFormatSelect = () => {
    const [isOpen, openMenu, closeMenu] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    const v = useCurrentValue();

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openMenu}>
                <RenderValue
                    width={VALUE_WIDTH}
                    height={VALUE_HEIGHT}
                    mini
                    v={v}
                />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Menu anchorEl={anchorRef.current} onClose={closeMenu} />
            ) : null}
        </>
    );
};

export default TextFormatSelect;
