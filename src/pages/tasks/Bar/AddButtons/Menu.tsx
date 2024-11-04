import useDialog from "@/hooks/useDialog";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const AddColumnDialog = dynamic(() => import("./Dialog"));

interface Props {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, onClose }: Props) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
                <MenuList>
                    <MenuItem onClick={openDialog}>
                        {t("Create column")}
                    </MenuItem>
                </MenuList>
            </MuiMenu>

            {isOpen ? <AddColumnDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default Menu;
