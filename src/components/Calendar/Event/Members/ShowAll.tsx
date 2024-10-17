import useDialog from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import { useRef } from "react";
import Popover from "./Popover";

const ShowAll = () => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Button ref={anchorRef} onClick={openPopover} variant="text">
                Show all
            </Button>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default ShowAll;
