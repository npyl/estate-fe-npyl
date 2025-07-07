import { useFiltersContext } from "../../../Context";
import { t } from "i18next";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";

const PublishedChip = () => {
    const {
        deleteFilter,
        filters: { published },
    } = useFiltersContext();
    const label = published ? t("Published") : t("Unpublished");
    const onDelete = useCallback(() => deleteFilter("published"), []);
    return <Chip label={label} onDelete={onDelete} />;
};

export default PublishedChip;
