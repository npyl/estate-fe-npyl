import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import ChipLabel from "@/ui/Filters/ChipLabel";
import {
    useFiltersContext,
    useMinArea,
} from "@/sections/Properties/FiltersContext";

const MinAreaChip = () => {
    const { t } = useTranslation();

    const maxValue = useMinArea();

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("minArea");

    return (
        <Chip
            label={
                <ChipLabel
                    separateThousands
                    title={`${t("Minimum Area")} (m²)`}
                    value={maxValue}
                />
            }
            onDelete={handleClear}
        />
    );
};

export default MinAreaChip;
