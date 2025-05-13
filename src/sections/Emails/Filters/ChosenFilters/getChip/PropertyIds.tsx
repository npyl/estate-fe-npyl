import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const PropertyIdsChip = () => {
    const { t } = useTranslation();
    const { filters, currentPropertyId, deleteFilter } = useFiltersContext();
    const { propertyIds } = filters;

    const p = propertyIds.filter((id) => id !== currentPropertyId);

    const onDelete = useCallback(() => deleteFilter("propertyIds"), []);

    if (p.length === 0) return null;

    const label = p.join(", ");

    return (
        <Chip
            label={<ChipLabel title={t("Properties")} value={label} />}
            onDelete={onDelete}
        />
    );
};

export default PropertyIdsChip;
