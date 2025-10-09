import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { useRef } from "react";
import SelectedColorBox from "./Selected";
const Popover = dynamic(() => import("./Popover"));

// ----------------------------------------------------------------------------------

const Color = () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <SelectedColorBox />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default Color;
