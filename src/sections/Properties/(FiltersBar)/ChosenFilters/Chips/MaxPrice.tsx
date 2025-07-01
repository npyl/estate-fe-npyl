import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import ChipLabel from "@/ui/Filters/ChipLabel";
import {
    useFiltersContext,
    useMaxPrice,
} from "@/sections/Properties/FiltersContext";

const MaxPriceChip = () => {
    const { t } = useTranslation();

    const maxValue = useMaxPrice();

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("maxPrice");

    return (
        <Chip
            label={
                <ChipLabel
                    title={`${t("Maximum Price")} (€)`}
                    value={maxValue?.toLocaleString("el-GR") || ""}
                />
            }
            onDelete={handleClear}
        />
    );
};

export default MaxPriceChip;
