import MuiMenu from "@mui/material/Menu";
import { FC } from "react";
import Content from "./Content";

interface MenuProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu: FC<MenuProps> = ({ anchorEl, onClose }) => (
    <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
        <Content />
    </MuiMenu>
);

export default Menu;
