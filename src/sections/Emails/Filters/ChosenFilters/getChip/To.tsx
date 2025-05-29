import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import MuiChip from "@mui/material/Chip";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const Chip = () => {
    const { t } = useTranslation();
    const { filters, currentCustomerEmail, deleteFilter } = useFiltersContext();
    const { to } = filters;

    const p = to?.filter((e) => e !== currentCustomerEmail);
    const label = p.join(", ");

    const onDelete = useCallback(() => deleteFilter("to"), []);

    if (p.length === 0) return null;

    return (
        <MuiChip
            label={<ChipLabel title={t("To")} value={label} />}
            onDelete={onDelete}
        />
    );
};

const ToChip = () => {
    const { box } = useFiltersContext();
    if (box !== "SENT") return null;
    return <Chip />;
};

export default ToChip;
