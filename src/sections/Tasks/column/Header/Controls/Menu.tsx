import MuiMenu from "@mui/material/Menu";
import DeleteColumnItem from "./DeleteColumnItem";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";

const EditColumnItem = () => {
    const { t } = useTranslation();
    return <MenuItem>{t("Edit")}</MenuItem>;
};

interface Props {
    anchorEl: HTMLElement;
    columnId: number;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, columnId, onClose }: Props) => (
    <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
        <EditColumnItem />
        <DeleteColumnItem columnId={columnId} />
    </MuiMenu>
);

export default Menu;
