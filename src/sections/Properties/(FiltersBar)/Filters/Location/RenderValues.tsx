import { useCities, useRegions } from "@/sections/Properties/FiltersContext";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

const RenderValues = () => {
    const { t } = useTranslation();

    const regions = useRegions() || [];
    const cities = useCities() || [];

    const count = regions.length + cities.length;
    const label = `${count} ${t("choices")}`;

    if (count === 0) return null;

    return <Chip label={label} />;
};

export default RenderValues;
