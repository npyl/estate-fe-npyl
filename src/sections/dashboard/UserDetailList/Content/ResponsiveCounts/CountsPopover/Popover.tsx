import MuiPopover from "@mui/material/Popover";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<Props> = ({ anchorEl, onClose, children }) => (
    <MuiPopover open anchorEl={anchorEl} onClose={onClose}>
        {children}
    </MuiPopover>
);

export default Popover;
