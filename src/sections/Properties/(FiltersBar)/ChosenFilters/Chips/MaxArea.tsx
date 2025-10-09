import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import ChipLabel from "@/ui/Filters/ChipLabel";
import {
    useFiltersContext,
    useMaxArea,
} from "@/sections/Properties/FiltersContext";

const MaxAreaChip = () => {
    const { t } = useTranslation();

    const maxValue = useMaxArea();

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("maxArea");

    return (
        <Chip
            label={
                <ChipLabel
                    separateThousands
                    title={`${t("Maximum Area")} (m²)`}
                    value={maxValue}
                />
            }
            onDelete={handleClear}
        />
    );
};

export default MaxAreaChip;
