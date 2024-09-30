import ClearableSection from "@/components/Filters/ClearableSection";
import {
    resetBedrooms,
    selectMaxBedrooms,
    selectMinBedrooms,
    setMaxBedrooms,
    setMinBedrooms,
} from "@/slices/filters";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MAX_VALUE = 5;

const count = Array.from({ length: MAX_VALUE }, (_, i) => i);

// -----------------------------------------------------------------

const getLabel = (i: number) => (i === MAX_VALUE ? "5+" : i);

interface CustomButtonProps {
    i: number;
    onClick: (i: number) => void;
}

const CustomButton: FC<CustomButtonProps> = ({ i, onClick }) => {
    const minBeds = useSelector(selectMinBedrooms);
    const maxBeds = useSelector(selectMaxBedrooms);

    const haveMin = Boolean(minBeds);
    const haveMax = Boolean(maxBeds);

    const case0 = haveMin && !haveMax && i < minBeds!;
    const case1 = haveMin && haveMax && i >= minBeds! && i <= maxBeds!;
    const case2 = haveMax && i >= maxBeds!;

    const variant = case0 || case1 || case2 ? "contained" : "outlined";

    return (
        <Button onClick={() => onClick(i)} variant={variant}>
            {getLabel(i)}
        </Button>
    );
};

const getButton = (onClick: (i: number) => void) => (i: number) =>
    <CustomButton key={i} i={i} onClick={onClick} />;

// -----------------------------------------------------------------

const Beds = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const minBeds = useSelector(selectMinBedrooms);
    const maxBeds = useSelector(selectMaxBedrooms);

    const haveMin = Boolean(minBeds);
    const haveMax = Boolean(maxBeds);

    const handleReset = () => dispatch(resetBedrooms());

    const handleClick = (i: number) => {
        // MAX_VALUE
        if (i === MAX_VALUE) {
            dispatch(setMinBedrooms(undefined));
            dispatch(setMaxBedrooms(MAX_VALUE));
        }

        // (a.k.a. First time)
        if (!haveMin && !haveMax) {
            dispatch(setMinBedrooms(1));
            dispatch(setMaxBedrooms(i));
        }

        // < min
        if (haveMin && i < minBeds!) {
            dispatch(setMinBedrooms(i));
        }

        // > min,  < max
        if (haveMin && haveMax && i > minBeds! && i < maxBeds!) {
            dispatch(setMinBedrooms(i));
        }

        // > max
        if (haveMin && haveMax && i > maxBeds!) {
            dispatch(setMaxBedrooms(i));
        }
    };

    return (
        <ClearableSection title={t("Bedrooms")} reset={resetBedrooms}>
            <ButtonGroup variant="outlined">
                <Button onClick={handleReset}>{t("Any")}</Button>
                {count.map(getButton(handleClick))}
            </ButtonGroup>
        </ClearableSection>
    );
};

export default Beds;
