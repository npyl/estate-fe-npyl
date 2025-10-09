import { FC, useMemo } from "react";
import { TTags } from "../types";
import useEnums from "../../useEnums";
import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import getEnumLabel from "./util";
import {
    useChangedFields,
    useFiltersContext,
} from "@/sections/Properties/FiltersContext";
import { formatThousands } from "@/utils/formatNumber";

const useValue = (suffix: string) => {
    const { minFloorEnum, maxFloorEnum } = useEnums();
    const changedProps = useChangedFields();

    return useMemo(() => {
        const minValue = changedProps[`min${suffix}`];
        const maxValue = changedProps[`max${suffix}`];

        if (suffix === "Floor") {
            const min = getEnumLabel(minValue, minFloorEnum);
            const max = getEnumLabel(maxValue, maxFloorEnum);
            return `${min}-${max}`;
        }

        if (suffix === "Price" || suffix === "Area") {
            const min = formatThousands(minValue);
            const max = formatThousands(maxValue);
            return `${min}-${max}`;
        }

        // Other
        return `${minValue}-${maxValue}`;
    }, [suffix, changedProps, minFloorEnum, maxFloorEnum]);
};

interface MinMaxChipProps {
    suffix: string;
    pairFilterTags: TTags;
}

const MinMaxChip: FC<MinMaxChipProps> = ({ suffix, pairFilterTags }) => {
    const label = pairFilterTags[`minMax${suffix}`].label;
    const value = useValue(suffix);

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => {
        deleteFilter(`min${suffix}`);
        deleteFilter(`max${suffix}`);
    };

    return (
        <Chip
            label={<ChipLabel title={label} value={value} />}
            onDelete={handleClear}
        />
    );
};

export default MinMaxChip;
