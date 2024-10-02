import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import ChipLabel from "./ChipLabel";
import { dispatch } from "@/store";
import { deleteFilter, selectMaxPrice } from "@/slices/filters";
import { useSelector } from "react-redux";

const MaxPriceChip = () => {
    const { t } = useTranslation();
    const maxValue = useSelector(selectMaxPrice);
    const handleClear = () => dispatch(deleteFilter("maxPrice"));

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
