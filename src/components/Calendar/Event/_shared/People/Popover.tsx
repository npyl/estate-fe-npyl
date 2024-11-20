import MuiPopover from "@mui/material/Popover";
import { FC } from "react";

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => {
    return (
        <MuiPopover open anchorEl={anchorEl} onClose={onClose}>
            ...
        </MuiPopover>
    );
};

export default Popover;
