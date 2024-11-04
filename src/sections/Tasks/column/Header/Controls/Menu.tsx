import MuiMenu from "@mui/material/Menu";
import DeleteColumnItem from "./DeleteColumnItem";
import EditColumnItem from "./EditColumnItem";

interface Props {
    anchorEl: HTMLElement;
    columnId: number;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, columnId, onClose }: Props) => (
    <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
        <EditColumnItem columnId={columnId} />
        <DeleteColumnItem columnId={columnId} />
    </MuiMenu>
);

export default Menu;
