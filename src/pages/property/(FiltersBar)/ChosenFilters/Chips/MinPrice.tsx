import { useTranslation } from "react-i18next";
import ChipLabel from "./ChipLabel";
import { useSelector } from "react-redux";
import { deleteFilter, selectMinPrice } from "@/slices/filters";
import { useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";

const MinPriceChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const minValue = useSelector(selectMinPrice);
    const handleClear = () => dispatch(deleteFilter("minPrice"));

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
