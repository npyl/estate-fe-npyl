import Popover from "@mui/material/Popover";
import { FC } from "react";
import Content, { ContentProps } from "./Content";
import { SxProps, Theme } from "@mui/material";

const PaperSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    p: 1,
};

interface SideMenuProps extends ContentProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const SideMenu: FC<SideMenuProps> = ({ anchorEl, onClose, ...props }) => (
    <Popover
        open
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: "top",
            horizontal: "left",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        slotProps={{ paper: { sx: PaperSx } }}
    >
        <Content {...props} />
    </Popover>
);

export default SideMenu;
