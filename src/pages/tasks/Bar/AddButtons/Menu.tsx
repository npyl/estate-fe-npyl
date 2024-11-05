import useDialog from "@/hooks/useDialog";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const AddColumnDialog = dynamic(
    () => import("@/sections/Tasks/column/AddDialog")
);

interface Props {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu = ({ anchorEl, onClose }: Props) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    const handleClose = () => {
        closeDialog();
        onClose();
    };

    return (
        <>
            <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
                <MenuItem onClick={openDialog}>{t("Add column")}</MenuItem>
            </MuiMenu>

            {isOpen ? <AddColumnDialog onClose={handleClose} /> : null}
        </>
    );
};

export default Menu;
