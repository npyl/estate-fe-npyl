import { FormControl, Select, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { selectRegions } from "src/slices/filters";
import Tabs from "./Tabs";
import RenderValues from "./RenderValues";
import { useTranslation } from "react-i18next";

export default function Location() {
    const { t } = useTranslation();
    const regions = useSelector(selectRegions) || [];

    // Use an empty array as the value if there are no regions
    const value = regions.length > 0 ? [1] : [];

    return (
        <FormControl sx={{ minWidth: "140px", maxWidth: "150px" }}>
            <InputLabel>{t("Locations")}</InputLabel>
            <Select
                multiple
                value={value}
                renderValue={() => <RenderValues />}
                label={t("Locations")}
            >
                <Tabs />
            </Select>
        </FormControl>
    );
}
