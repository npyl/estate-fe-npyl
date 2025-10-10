import MuiPopover from "@mui/material/Popover";
import { FC } from "react";
import Content from "./Content";

// ----------------------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => (
    <MuiPopover
        open
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorEl={anchorEl}
        onClose={onClose}
    >
        <Content />
    </MuiPopover>
);

export default Popover;
