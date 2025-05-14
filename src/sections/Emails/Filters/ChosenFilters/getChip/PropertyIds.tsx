import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TCodeMap } from "../useCache";

interface Props {
    CODES: TCodeMap;
}

const PropertyIdsChip: FC<Props> = ({ CODES }) => {
    const { t } = useTranslation();
    const { filters, currentPropertyId, deleteFilter } = useFiltersContext();
    const { propertyIds } = filters;

    const p = useMemo(
        () => propertyIds.filter((id) => id !== currentPropertyId),
        [propertyIds, currentPropertyId]
    );

    const label = useMemo(() => p.map((id) => CODES.get(id)), [CODES, p])?.join(
        ", "
    );

    const onDelete = useCallback(() => deleteFilter("propertyIds"), []);

    if (p.length === 0) return null;

    return (
        <Chip
            label={<ChipLabel title={t("Properties")} value={label} />}
            onDelete={onDelete}
        />
    );
};

export default PropertyIdsChip;
