import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const ToChip = () => {
    const { t } = useTranslation();
    const { filters, deleteFilter } = useFiltersContext();
    const { to } = filters;

    const onDelete = useCallback(() => deleteFilter("to"), []);

    return (
        <Chip
            label={<ChipLabel title={t("To")} value={to?.join(", ")} />}
            onDelete={onDelete}
        />
    );
};

export default ToChip;
