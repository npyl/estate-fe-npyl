import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import { toNumberSafe } from "@/utils/toNumber";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const PropertyIdsChip = () => {
    const { t } = useTranslation();
    const { filters, deleteFilter } = useFiltersContext();
    const { propertyIds } = filters;

    const onDelete = useCallback(() => deleteFilter("propertyIds"), []);

    const router = useRouter();
    const { propertyId } = router.query;
    const currentPropertyId = toNumberSafe(propertyId);
    const p = propertyIds.filter((id) => id !== currentPropertyId);

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
