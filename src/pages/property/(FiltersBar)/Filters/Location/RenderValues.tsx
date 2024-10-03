import { selectCities, selectRegions } from "@/slices/filters";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RenderValues = () => {
    const { t } = useTranslation();

    const regions = useSelector(selectRegions) || [];
    const cities = useSelector(selectCities) || [];

    const count = regions.length + cities.length;
    const label = `${count} ${t("choices")}`;

    if (count === 0) return null;

    return <Chip label={label} />;
};

export default RenderValues;
