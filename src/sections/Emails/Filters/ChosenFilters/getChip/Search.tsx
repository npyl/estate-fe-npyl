import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/ui/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";

const SearchChip = () => {
    const { t } = useTranslation();
    const { filters, deleteFilter } = useFiltersContext();
    const { search } = filters;

    const onDelete = useCallback(() => deleteFilter("search"), []);

    return (
        <Chip
            label={<ChipLabel title={t("Search")} value={search} />}
            onDelete={onDelete}
        />
    );
};

export default SearchChip;
