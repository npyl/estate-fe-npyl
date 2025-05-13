import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";

const FromChip = () => {
    const { t } = useTranslation();
    const { filters, deleteFilter } = useFiltersContext();
    const { from } = filters;

    const onDelete = useCallback(() => deleteFilter("from"), []);

    return (
        <Chip
            label={<ChipLabel title={t("From")} value={from} />}
            onDelete={onDelete}
        />
    );
};

export default FromChip;
