import { IGeoLocation } from "@/types/geolocation";
import Checkbox from "@mui/material/Checkbox";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CustomMenuItem extends Omit<MenuItemProps, "onClick"> {
    o: IGeoLocation;
    onClick: (areaID: number) => void;
}

const CustomMenuItem: FC<CustomMenuItem> = ({
    o: { areaID, nameEN, nameGR },
    onClick: _onClick,
    ...props
}) => {
    const { i18n } = useTranslation();
    const onClick = useCallback(() => _onClick(areaID), [_onClick, areaID]);
    return (
        <MenuItem value={areaID.toString()} onClick={onClick} {...props}>
            <Checkbox checked={props.selected} />
            {i18n.language === "en" ? nameEN : nameGR}
        </MenuItem>
    );
};

export default CustomMenuItem;
