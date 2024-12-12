import { IconButton } from "@mui/material";
import { useRef } from "react";
const Popover = dynamic(() => import("./popover"));
import ExportImage from "./ExportImage";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";

const ExportButton = () => {
    // Popper
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <ExportImage />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default ExportButton;
