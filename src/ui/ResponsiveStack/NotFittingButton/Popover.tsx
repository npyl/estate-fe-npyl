import stopPropagation from "@/utils/stopPropagation";
import MuiPopover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import { FC } from "react";

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;

    overflowing: ReactNode[];
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose, overflowing }) => (
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
        onClick={stopPropagation}
        onClose={onClose}
    >
        <Stack direction="row" gap={1} flexWrap="wrap" p={1} maxWidth="50vw">
            {overflowing}
        </Stack>
    </MuiPopover>
);

export default Popover;
