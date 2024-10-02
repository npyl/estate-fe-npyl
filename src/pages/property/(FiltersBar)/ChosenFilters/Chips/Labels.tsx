import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";
import { selectLabels } from "@/slices/filters";
import { useGetLabelsQuery } from "@/services/labels";
import { useMemo } from "react";
import { ILabel } from "@/types/label";
import { Chip } from "@mui/material";

const idToLabelName =
    (all: ILabel[]) =>
    (labelId: number): string =>
        all.find(({ id }) => id === labelId)?.name || "";

const LabelsChip = () => {
    const { t } = useTranslation();

    const ids = useSelector(selectLabels);
    const { data: labels } = useGetLabelsQuery();

    const names = useMemo(() => {
        const all = labels?.propertyLabels || [];
        return ids.map(idToLabelName(all)).join(", ");
    }, [ids, labels?.propertyLabels]);

    return <Chip label={<ChipLabel title={t("Labels")} value={names} />} />;
};

export default LabelsChip;
