import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/ui/Filters/ChipLabel";
import MuiChip from "@mui/material/Chip";
import { useCallback } from "react";

const Chip = () => {
    const { t } = useTranslation();
    const { filters, currentCustomerEmail, deleteFilter } = useFiltersContext();
    const { from } = filters;

    const p = from?.filter((e) => e !== currentCustomerEmail);
    const label = p.join(", ");

    const onDelete = useCallback(() => deleteFilter("from"), []);

    if (p.length === 0) return null;

    return (
        <MuiChip
            label={<ChipLabel title={t("From")} value={label} />}
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
