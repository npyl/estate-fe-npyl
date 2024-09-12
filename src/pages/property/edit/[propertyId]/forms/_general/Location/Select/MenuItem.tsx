import {
    Checkbox,
    MenuItem as MuiMenuItem,
    MenuItemProps as MuiMenuItemProps,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface MenuItemProps extends MuiMenuItemProps {
    nameEN: string;
    nameGR: string;
    checked: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ nameEN, nameGR, checked, ...props }) => {
    const { i18n } = useTranslation();

    return (
        <MuiMenuItem {...props}>
            <Checkbox checked={checked} />
            {i18n.language === "en" ? nameEN : nameGR}
        </MuiMenuItem>
    );
};

export default MenuItem;
