import StyledMenu from "@/components/StyledMenu";
import { itemTypeToPath, MENU_ITEMS } from "../constants";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TMenuItem } from "../types";

interface DekstopMenuItemProps extends TMenuItem {}

const DesktopMenuItem: FC<DekstopMenuItemProps> = ({ path, icon, label }) => {
    const { t } = useTranslation();

    const router = useRouter();

    const startCreate = useCallback(
        () => router.push(itemTypeToPath[path]),
        []
    );

    return (
        <MenuItem onClick={startCreate} disableRipple>
            {icon}
            {t(label)}
        </MenuItem>
    );
};

const getMenuItem = (props: TMenuItem) => (
    <DesktopMenuItem key={props.path} {...props} />
);

interface MenuProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu: FC<MenuProps> = ({ anchorEl, onClose }) => (
    <StyledMenu anchorEl={anchorEl} open onClose={onClose}>
        {MENU_ITEMS.map(getMenuItem)}
    </StyledMenu>
);

export default Menu;
