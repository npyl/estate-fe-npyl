import { IGeoLocation } from "@/types/geolocation";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CustomMenuItem extends IGeoLocation {
    checked: boolean;
}

const CustomMenuItem: FC<CustomMenuItem> = ({
    areaID,
    nameEN,
    nameGR,
    checked,
}) => {
    const { i18n } = useTranslation();
    return (
        <MenuItem value={areaID.toString()}>
            <Checkbox checked={checked} />
            {i18n.language === "en" ? nameEN : nameGR}
        </MenuItem>
    );
};

export default CustomMenuItem;
