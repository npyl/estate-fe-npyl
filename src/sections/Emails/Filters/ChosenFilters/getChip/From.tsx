import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import MuiChip from "@mui/material/Chip";
import { useCallback } from "react";

const Chip = () => {
    const { t } = useTranslation();
    const { filters, deleteFilter } = useFiltersContext();
    const { from } = filters;

    const p = from?.join(", ");

    const onDelete = useCallback(() => deleteFilter("from"), []);

    return (
        <MuiChip
            label={<ChipLabel title={t("From")} value={p} />}
            onDelete={onDelete}
        />
    );
};

const FromChip = () => {
    const { box } = useFiltersContext();
    if (box === "SENT") return null;
    return <Chip />;
};

export default FromChip;
