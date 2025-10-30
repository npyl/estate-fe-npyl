import { FC } from "react";
import MuiPopover from "@mui/material/Popover";
import Content from "./Content";
import { SxProps, Theme } from "@mui/material";

const PaperSx: SxProps<Theme> = {
    border: 0,
    boxShadow: 0,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    gap: 0.5,
    mx: 1,
};

interface PopoverProps {
    anchorEl: HTMLDivElement;
    roleId: number;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, roleId, onClose }) => (
    <MuiPopover
        open
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: "center",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "center",
            horizontal: "left",
        }}
        slotProps={{
            paper: {
                sx: PaperSx,
            },
        }}
    >
        <Content roleId={roleId} onClose={onClose} />
    </MuiPopover>
);

export default Popover;
