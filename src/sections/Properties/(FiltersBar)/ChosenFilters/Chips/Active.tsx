import {
    useActiveState,
    useFiltersContext,
} from "@/sections/Properties/FiltersContext";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";

const ActiveChip = () => {
    const { t } = useTranslation();

    const isActive = useActiveState();
    const activeLabel = isActive ? t("Active") : t("Inactive");

    const { deleteFilter } = useFiltersContext();
    const handleDelete = () => deleteFilter("active");

    return <Chip label={activeLabel} onDelete={handleDelete} />;
};

export default ActiveChip;
