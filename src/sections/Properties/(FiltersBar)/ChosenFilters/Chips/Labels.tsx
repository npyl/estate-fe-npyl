import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";
import { useGetLabelsQuery } from "@/services/labels";
import { useMemo } from "react";
import { ILabel } from "@/types/label";
import { Chip } from "@mui/material";
import {
    useFiltersContext,
    useLabels,
} from "@/sections/Properties/FiltersContext";

const idToLabelName =
    (all: ILabel[]) =>
    (labelId: number): string =>
        all.find(({ id }) => id === labelId)?.name || "";

const LabelsChip = () => {
    const { t } = useTranslation();

    const ids = useLabels();
    const { data: labels } = useGetLabelsQuery();

    const names = useMemo(() => {
        const all = labels?.propertyLabels || [];
        return ids.map(idToLabelName(all)).join(", ");
    }, [ids, labels?.propertyLabels]);

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("labels");

    return (
        <Chip
            label={<ChipLabel title={t("Labels")} value={names} />}
            onDelete={handleClear}
        />
    );
};

export default LabelsChip;
