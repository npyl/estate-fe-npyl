import { FC } from "react";
import { TTags } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useEnums from "../../useEnums";
import { deleteFilter, getChangedFields } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import ChipLabel from "./ChipLabel";
import getEnumLabel from "./util";

interface MinMaxChipProps {
    suffix: string;
    pairFilterTags: TTags;
}

const MinMaxChip: FC<MinMaxChipProps> = ({ suffix, pairFilterTags }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { minFloorEnum, maxFloorEnum } = useEnums();
    const changedProps = useSelector(getChangedFields);

    const label = pairFilterTags[`minMax${suffix}`].label;

    const minValue = changedProps[`min${suffix}`];
    const maxValue = changedProps[`max${suffix}`];

    const handleClear = () => {
        dispatch(deleteFilter(`min${suffix}`));
        dispatch(deleteFilter(`max${suffix}`));
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
