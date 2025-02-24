import MuiMenu from "@mui/material/Menu";
import { FC, MouseEvent } from "react";
import CopyLinkItem from "./CopyLinkItem";
import DeleteItem from "./DeleteLinkItem";
import ShareItem from "./ShareItem";

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

interface Props {
    anchorEl: HTMLElement;
    taskId: number;
    onClose: VoidFunction;
}

const Menu: FC<Props> = ({ anchorEl, taskId, onClose }) => (
    <MuiMenu
        open
        anchorEl={anchorEl}
        onClick={stopPropagation}
        onClose={onClose}
    >
        <CopyLinkItem taskId={taskId} />
        <ShareItem taskId={taskId} />
        <DeleteItem taskId={taskId} />
    </MuiMenu>
);

export default Menu;
