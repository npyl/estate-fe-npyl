import ClearableSection from "@/components/Filters/ClearableSection";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useMaxBedrooms,
    useMinBedrooms,
} from "../../FiltersContext";

const MAX_VALUE = 5;

const BUTTONS = [
    "Any",
    ...Array.from({ length: MAX_VALUE - 1 }, (_, i) => String(i + 1)),
    "5+",
];

const calculateNewSelection = (
    value: number,
    minBeds: number | undefined,
    maxBeds: number | undefined,
    MAX_VALUE: number
): [number | undefined, number | undefined] => {
    const currentMin = minBeds ?? -1;
    const currentMax = maxBeds ?? -1;

    let newMin = undefined;
    let newMax = undefined;

    if (currentMin === -1 && currentMax === -1) {
        newMin = value;
    } else if (value < currentMin) {
        newMin = value;
        newMax = currentMax === MAX_VALUE ? undefined : currentMax;
    } else if (value > currentMax) {
        newMin = currentMin;
        newMax = value < MAX_VALUE ? value : undefined;
    } else if (Math.abs(value - currentMin) < Math.abs(value - currentMax)) {
        newMin = value;
        newMax = currentMax === MAX_VALUE ? undefined : currentMax;
    } else if (value === currentMin) {
        newMin = value + 1 <= currentMax ? value + 1 : value;
        newMax = currentMax === MAX_VALUE ? undefined : currentMax;
    } else if (value === currentMax) {
        newMin = currentMin;
        newMax = value - 1 >= currentMin ? value - 1 : value;
    } else {
        newMin = currentMin;
        newMax = value < MAX_VALUE ? value : undefined;
    }

    return [
        newMin === -1 ? undefined : newMin, // normalise
        newMax === -1 ? undefined : newMax, // normalise
    ];
};

interface CustomButtonProps {
    value: string;
}

const CustomButton: FC<CustomButtonProps> = ({ value }) => {
    const { t } = useTranslation();

    const minBeds = useMinBedrooms();
    const maxBeds = useMaxBedrooms();

    const { resetBedrooms, setMinBedrooms, setMaxBedrooms } =
        useFiltersContext();

    const handleClick = (value: string) => {
        if (value === "Any") {
            resetBedrooms();
        } else if (value === "5+") {
            setMinBedrooms(5);
            setMaxBedrooms(undefined);
        } else {
            const numValue = parseInt(value, 10);

            const [newMin, newMax] = calculateNewSelection(
                numValue,
                minBeds,
                maxBeds,
                MAX_VALUE
            );

            setMinBedrooms(newMin);
            setMaxBedrooms(newMax);
        }
    };

    const getButtonVariant = () => {
        if (value === "Any" && minBeds === undefined && maxBeds === undefined) {
            return "contained";
        }
        if (value === "5+" && minBeds === 5 && maxBeds === undefined) {
            return "contained";
        }

        const numValue = parseInt(value, 10);

        if (!isNaN(numValue)) {
            if (minBeds !== undefined && maxBeds !== undefined) {
                return numValue >= minBeds && numValue <= maxBeds
                    ? "contained"
                    : "outlined";
            } else if (minBeds !== undefined) {
                return numValue >= minBeds ? "contained" : "outlined";
            }
        }
        return "outlined";
    };

    return (
        <Button
            key={value}
            onClick={() => handleClick(value)}
            variant={getButtonVariant()}
        >
            {t(value)}
        </Button>
    );
};

const Beds = () => {
    const { t } = useTranslation();

    const { resetBedrooms } = useFiltersContext();

    return (
        <ClearableSection title={t("Bedrooms")} reset={resetBedrooms}>
            <ButtonGroup>
                {BUTTONS.map((value) => (
                    <CustomButton key={value} value={value} />
                ))}
            </ButtonGroup>
        </ClearableSection>
    );
};

export default Beds;
