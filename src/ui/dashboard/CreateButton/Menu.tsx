import StyledMenu from "@/ui/dashboard/dashboard-navbar/StyledMenu";
import { MENU_ITEMS } from "./constants";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TMenuItem } from "./types";
import Link from "@/components/Link";

interface DekstopMenuItemProps extends TMenuItem {}

const DesktopMenuItem: FC<DekstopMenuItemProps> = ({ path, icon, label }) => {
    const { t } = useTranslation();
    return (
        <MenuItem disableRipple>
            {icon}
            <Link href={path} width={1} color="text.secondary" fontWeight={500}>
                {t(label)}
            </Link>
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
