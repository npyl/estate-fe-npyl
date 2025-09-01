import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import useEnums from "../../useEnums";
import ChipLabel from "@/ui/Filters/ChipLabel";
import getEnumLabel from "./util";
import {
    useFiltersContext,
    useMinFloor,
} from "@/sections/Properties/FiltersContext";

const MinFloorChip = () => {
    const { t } = useTranslation();

    const { minFloorEnum } = useEnums();

    const minValue = useMinFloor();
    const minLabel = getEnumLabel(minValue, minFloorEnum);

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("minFloor");

    return (
        <Chip
            label={<ChipLabel title={t("Minimum Floor")} value={minLabel} />}
            onDelete={handleClear}
        />
    );
};

export default MinFloorChip;
