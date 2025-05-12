import { Chip } from "@mui/material";
import useEnums from "../../useEnums";
import ChipLabel from "@/sections/Filters/ChipLabel";
import getEnumLabel from "./util";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useMaxFloor,
} from "@/sections/Properties/FiltersContext";

const MaxFloorChip = () => {
    const { t } = useTranslation();

    const { maxFloorEnum } = useEnums();

    const maxValue = useMaxFloor();
    const maxLabel = getEnumLabel(maxValue, maxFloorEnum);

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter("maxFloor");

    return (
        <Chip
            label={<ChipLabel title={t("Maximum Floor")} value={maxLabel} />}
            onDelete={handleClear}
        />
    );
};

export default MaxFloorChip;
