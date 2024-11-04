import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CopyLinkItemProps {
    taskId: number;
}

const CopyLinkItem: FC<CopyLinkItemProps> = ({ taskId }) => {
    const { t } = useTranslation();
    return <MenuItem>{t("Copy Link")}</MenuItem>;
};
const DeleteItem = () => {
    const { t } = useTranslation();
    return <MenuItem>{t("Delete")}</MenuItem>;
};

interface Props {
    anchorEl: HTMLElement;
    taskId: number;
    onClose: VoidFunction;
}

const Menu: FC<Props> = ({ anchorEl, taskId, onClose }) => (
    <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
        <CopyLinkItem taskId={taskId} />
        <DeleteItem />
    </MuiMenu>
);

export default Menu;
