import Tabs from "./Tabs";
import RenderValues from "./RenderValues";
import { useTranslation } from "react-i18next";
import { useRegions } from "@/sections/Properties/FiltersContext";
import Select from "@/components/Select";
import { useCallback } from "react";

export default function Location() {
    const { t } = useTranslation();

    const regions = useRegions() || [];

    // Use an empty array as the value if there are no regions
    const value = regions.length > 0 ? [1] : [];

    const renderValue = useCallback(() => <RenderValues />, []);

    return (
        <Select
            multiple
            value={value}
            renderValue={renderValue}
            formControlProps={{
                sx: { minWidth: "140px", maxWidth: "150px" },
            }}
            label={t("Locations")}
        >
            <Tabs />
        </Select>
    );
}
