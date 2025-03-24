import { useFiltersContext } from "@/sections/Properties/FiltersContext";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const PointsChip = () => {
    const { t } = useTranslation();

    const { deleteFilter } = useFiltersContext();
    const handleDelete = useCallback(() => deleteFilter("points"), []);

    return <Chip label={t("Shape")} onDelete={handleDelete} />;
};

export default PointsChip;
