import { useTranslation } from "react-i18next";
import ChipLabel from "@/ui/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import {
    useFiltersContext,
    useMinPrice,
} from "@/sections/Properties/FiltersContext";

const MinPriceChip = () => {
    const { t } = useTranslation();
    const minValue = useMinPrice();

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("minPrice");

    return (
        <Chip
            label={
                <ChipLabel
                    title={`${t("Minimum Price")} (€)`}
                    value={minValue?.toLocaleString("el-GR") || ""}
                />
            }
            onDelete={handleClear}
        />
    );
};

export default MinPriceChip;
