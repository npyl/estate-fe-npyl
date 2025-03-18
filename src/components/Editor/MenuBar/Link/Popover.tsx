import { FC } from "react";
import MuiPopover from "@mui/material/Popover";
import Content from "./Content";

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => (
    <MuiPopover
        open
        anchorEl={anchorEl}
        anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
        }}
        transformOrigin={{
            horizontal: "center",
            vertical: "top",
        }}
        onClose={onClose}
    >
        <Content />
    </MuiPopover>
);

export default Popover;
