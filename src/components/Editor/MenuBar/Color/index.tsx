import useDialog from "@/hooks/useDialog";
import IconButton from "@mui/material/IconButton";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Popover = dynamic(() => import("./Popover"));

const Color = () => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openPopover}>
                <FormatColorTextIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover onClose={closePopover} anchorEl={anchorRef.current} />
            ) : null}
        </>
    );
};

export default Color;
