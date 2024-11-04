import {
    useDeleteColumnMutation,
    useEditColumnMutation,
} from "@/services/tasks";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

interface Props {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, onClose }: Props) => {
    const { t } = useTranslation();

    const [editColumn] = useEditColumnMutation();
    const [deleteColumn] = useDeleteColumnMutation();

    return (
        <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
            <MenuItem>{t("Copy Link")}</MenuItem>
            <MenuItem>{t("Delete")}</MenuItem>
        </MuiMenu>
    );
};

export default Menu;
