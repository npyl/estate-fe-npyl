import { FC } from "react";
import { TTags } from "../types";
import { useTranslation } from "react-i18next";
import useEnums from "../../useEnums";
import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import getEnumLabel from "./util";
import {
    useChangedFields,
    useFiltersContext,
} from "@/sections/Properties/FiltersContext";

interface MinMaxChipProps {
    suffix: string;
    pairFilterTags: TTags;
}

const MinMaxChip: FC<MinMaxChipProps> = ({ suffix, pairFilterTags }) => {
    const { t } = useTranslation();

    const { minFloorEnum, maxFloorEnum } = useEnums();
    const changedProps = useChangedFields();

    const label = pairFilterTags[`minMax${suffix}`].label;

    const minValue = changedProps[`min${suffix}`];
    const maxValue = changedProps[`max${suffix}`];

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => {
        deleteFilter(`min${suffix}`);
        deleteFilter(`max${suffix}`);
    };

    if (suffix === "Floor") {
        const min = getEnumLabel(minValue, minFloorEnum);
        const max = getEnumLabel(maxValue, maxFloorEnum);

        return (
            <Chip
                label={<ChipLabel title={t("Floor")} value={`${min}-${max}`} />}
                onDelete={handleClear}
            />
        );
    }

    if (suffix === "Price") {
        const min = minValue.toLocaleString("el-GR");
        const max = maxValue.toLocaleString("el-GR");

        return (
            <Chip
                label={<ChipLabel title={label} value={`${min}-${max}`} />}
                onDelete={handleClear}
            />
        );
    }

    return (
        <Chip
            label={
                <ChipLabel title={label} value={`${minValue}-${maxValue}`} />
            }
            onDelete={handleClear}
        />
    );
};

export default MinMaxChip;
