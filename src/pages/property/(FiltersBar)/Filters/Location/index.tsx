import { FormControl, InputLabel, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { selectRegions } from "src/slices/filters";
import Tabs from "./Tabs";
import RenderValues from "./RenderValues";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function Location() {
    const { t } = useTranslation();

    const regions = useSelector(selectRegions) || [];

    // dummy value to trigger RenderValues
    let value = [];
    if (regions.length > 0) value.push(1);

    return (
        <FormControl sx={{ minWidth: "140px", maxWidth: "150px" }}>
            <InputLabel>{t("Locations")}</InputLabel>
            <Select multiple value={value} renderValue={() => <RenderValues />}>
                <Tabs />
            </Select>
        </FormControl>
    );
}
