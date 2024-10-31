import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useTranslation } from "react-i18next";

interface Props {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, onClose }: Props) => {
    const { t } = useTranslation();
    return (
        <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
            <MenuList>
                <MenuItem>{t("Create column")}</MenuItem>
            </MenuList>
        </MuiMenu>
    );
};

export default Menu;
