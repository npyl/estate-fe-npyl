import { FC, useMemo } from "react";
import { ButtonGroup, Button } from "@mui/material";
import ClearableSection from "@/components/Filters/ClearableSection";
import {
    resetFloor,
    selectMaxFloor,
    selectMinFloor,
    setMaxFloor,
    setMinFloor,
} from "@/slices/filters";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { KeyValue } from "@/types/KeyValue";
import { useSelector } from "react-redux";
import useEnums from "../useEnums";

const specialFloors = [
    "BASEMENT",
    "SEMI_BASEMENT",
    "GROUND_FLOOR",
    "MEZZANINE",
];

interface CustomButtonProps {
    o: KeyValue;
    all: KeyValue[];
}

const CustomButton: FC<CustomButtonProps> = ({ o: { key, value }, all }) => {
    const dispatch = useDispatch();

    const minFloor = useSelector(selectMinFloor);
    const maxFloor = useSelector(selectMaxFloor);

    const handleFloorClick = () => {
        if (specialFloors.includes(key)) {
            dispatch(setMinFloor(key));
        } else {
            const clickedIndex = all.findIndex((option) => option.key === key);
            const currentMinIndex = all.findIndex(
                (option) => option.key === minFloor
            );

            if (minFloor === undefined || clickedIndex < currentMinIndex) {
                // Set new min floor
                dispatch(setMinFloor(key));
                dispatch(setMaxFloor(undefined));
            } else if (key === minFloor && maxFloor === undefined) {
                // Deselect min floor if clicking it again and no max is set
                dispatch(setMinFloor(undefined));
            } else {
                // Set max floor
                dispatch(setMaxFloor(key));
            }
        }
    };

    const getIsContained = () => {
        if (specialFloors.includes(key) && minFloor === key) {
            return true;
        } else if (specialFloors.includes(key)) return false;

        if (minFloor === undefined) return false;

        const optionIndex = all.findIndex((option) => option.key === key);
        const minIndex = all.findIndex((option) => option.key === minFloor);
        const maxIndex = maxFloor
            ? all.findIndex((option) => option.key === maxFloor)
            : all.length - 1;

        return optionIndex >= minIndex && optionIndex <= maxIndex;
    };

    return (
        <Button
            key={key}
            onClick={handleFloorClick}
            variant={getIsContained() ? "contained" : "outlined"}
        >
            {value}
        </Button>
    );
};

const FloorSelector = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { minFloorEnum } = useEnums();
    const floorOptions = useMemo(
        () => minFloorEnum.slice(0, 9),
        [minFloorEnum]
    );

    const minFloor = useSelector(selectMinFloor);
    const maxFloor = useSelector(selectMaxFloor);

    const anyVariant = !minFloor && !maxFloor ? "contained" : "outlined";

    const handleClear = () => dispatch(resetFloor());

    return (
        <ClearableSection title={t("Floors")} reset={resetFloor}>
            <ButtonGroup variant="outlined">
                <Button onClick={handleClear} variant={anyVariant}>
                    {t("Any")}
                </Button>
                {floorOptions.map((o) => (
                    <CustomButton key={o.key} o={o} all={floorOptions} />
                ))}
            </ButtonGroup>
        </ClearableSection>
    );
};

export default FloorSelector;
