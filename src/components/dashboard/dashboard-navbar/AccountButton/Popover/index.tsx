import MuiPopover from "@mui/material/Popover";
import { FC } from "react";
import Content from "./Content";
import Header from "./Header";

interface Props {
    anchorEl: HTMLDivElement;
    onClose: VoidFunction;
}

const Popover: FC<Props> = ({ anchorEl, onClose }) => (
    <MuiPopover
        open
        anchorEl={anchorEl}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        slotProps={{
            paper: {
                sx: {
                    py: 1,
                    px: 2,
                    width: "fit-content",
                    ".MuiMenuItem-root": {
                        gap: 1,
                        color: "text.secondary",
                        borderRadius: 1,
                    },
                },
            },
        }}
        onClose={onClose}
    >
        <Header />
        <Content />
    </MuiPopover>
);

export default Popover;
