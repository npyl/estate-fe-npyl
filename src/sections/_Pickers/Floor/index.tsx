import { FC } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { KeyValue } from "@/types/KeyValue";
import { useGlobals } from "@/hooks/useGlobals";
import { useMemo } from "react";

const specialFloors = [
    "BASEMENT",
    "SEMI_BASEMENT",
    "GROUND_FLOOR",
    "MEZZANINE",
];

const useEnums = () => {
    const enums = useGlobals();

    const details = useMemo(() => enums?.property?.details, [enums]);

    return {
        minFloorEnum: details?.floors || [],
        maxFloorEnum: details?.floors || [],
    };
};

const useOptions = () => {
    const { minFloorEnum } = useEnums();
    const floorOptions = useMemo(
        () => minFloorEnum.slice(0, 9),
        [minFloorEnum]
    );
    return floorOptions;
};

interface CustomButtonProps {
    o: KeyValue;
    min?: string;
    max?: string;
    onMinChange: (key?: string) => void;
    onMaxChange: (key?: string) => void;
}

const CustomButton: FC<CustomButtonProps> = ({
    o: { key, value },
    min,
    max,
    onMinChange,
    onMaxChange,
}) => {
    const all = useOptions();

    const handleFloorClick = () => {
        if (specialFloors.includes(key)) {
            onMinChange(key);
        } else {
            const clickedIndex = all.findIndex((o) => o.key === key);
            const currentMinIndex = all.findIndex((o) => o.key === min);

            if (min === undefined || clickedIndex < currentMinIndex) {
                // Set new min floor
                onMinChange(key);
                onMaxChange(undefined);
            } else if (key === min && max === undefined) {
                // Deselect min floor if clicking it again and no max is set
                onMinChange(undefined);
            } else {
                // Set max floor
                onMaxChange(key);
            }
        }
    };

    const getIsContained = () => {
        if (specialFloors.includes(key) && min === key) {
            return true;
        } else if (specialFloors.includes(key)) return false;

        if (min === undefined) return false;

        const optionIndex = all.findIndex((option) => option.key === key);
        const minIndex = all.findIndex((option) => option.key === min);
        const maxIndex = max
            ? all.findIndex((option) => option.key === max)
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

const getOption =
    (
        min: string | undefined,
        max: string | undefined,
        onMinChange: (key?: string) => void,
        onMaxChange: (key?: string) => void
    ) =>
    (o: KeyValue) => (
        <CustomButton
            key={o.key}
            o={o}
            min={min}
            max={max}
            onMinChange={onMinChange}
            onMaxChange={onMaxChange}
        />
    );

interface FloorPickerProps {
    min?: string;
    max?: string;
    onMinChange: (key?: string) => void;
    onMaxChange: (key?: string) => void;
    onReset: VoidFunction;
}

const FloorPicker: FC<FloorPickerProps> = ({
    min,
    max,
    onMinChange,
    onMaxChange,
    onReset,
}) => {
    const { t } = useTranslation();

    const anyVariant = !min && !max ? "contained" : "outlined";
    const options = useOptions();

    return (
        <ButtonGroup variant="outlined">
            <Button onClick={onReset} variant={anyVariant}>
                {t("Any")}
            </Button>
            {options.map(getOption(min, max, onMinChange, onMaxChange))}
        </ButtonGroup>
    );
};

export default FloorPicker;
