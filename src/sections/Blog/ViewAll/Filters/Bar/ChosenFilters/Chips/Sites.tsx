import { useCallback, useMemo } from "react";
import { useFiltersContext } from "../../../Context";
import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import { useGetPublicSitesQuery } from "@/services/company";
import { useTranslation } from "react-i18next";

const SitesChip = () => {
    const { t } = useTranslation();
    const {
        deleteFilter,
        filters: { sites },
    } = useFiltersContext();
    const { data } = useGetPublicSitesQuery();
    const label = useMemo(
        () =>
            data
                ?.filter(({ id }) => sites.includes(id))
                ?.map(({ siteUrl }) => siteUrl)
                ?.join(", ") || "",
        [data, sites]
    );
    const onDelete = useCallback(() => deleteFilter("sites"), []);
    return (
        <Chip
            label={<ChipLabel title={t("Public Sites")} value={label} />}
            onDelete={onDelete}
        />
    );
};

export default SitesChip;
