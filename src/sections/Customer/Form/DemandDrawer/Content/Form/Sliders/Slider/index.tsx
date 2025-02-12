import { Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFDoubleSlider from "@/components/hook-form/dynamic/RHFDoubleSlider"; // Adjust the import as needed
import OptionsAutocomplete from "./OptionsAutocomplete";

type DemandFormSliderProps = {
    label: any;
    min: string;
    max: string;
    defaultMin: number;
    defaultMax: number;
    demandIndex: number;
    adornment?: string;
    step?: number;
    isForPrice?: boolean;
    isForYearOfConstruction?: boolean;
    options?: number[];
};

const Slider: FC<DemandFormSliderProps> = ({
    label,
    min,
    max,
    defaultMin,
    defaultMax,
    demandIndex,
    adornment,
    step = 1,
    isForPrice,
    isForYearOfConstruction,
    options = [],
}) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const minName = `demands.${demandIndex}.filters.${min}`;
    const maxName = `demands.${demandIndex}.filters.${max}`;

    const handleSliderChange = (value: number[]) => {
        let [minValue, maxValue] = value;

        // Ensure minValue is not greater than maxValue
        if (minValue > maxValue) {
            minValue = maxValue;
        }

        // Set value to default if it matches the default min and max
        setValue(minName, minValue === defaultMin ? defaultMin : minValue);
        setValue(maxName, maxValue === defaultMax ? defaultMax : maxValue);
    };

    return (
        <>
            <Typography variant="h6">{label}</Typography>
            <Stack mt={1} px={1}>
                <RHFDoubleSlider
                    minName={minName}
                    maxName={maxName}
                    min={defaultMin}
                    max={defaultMax}
                    step={step}
                    onChange={(_, v) => handleSliderChange(v as number[])}
                    valueLabelDisplay="auto"
                    isForPrice={isForPrice}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <OptionsAutocomplete
                            label={t("Min")}
                            name={minName}
                            adornment={adornment}
                            options={options}
                            isForYearOfConstruction={isForYearOfConstruction}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OptionsAutocomplete
                            label={t("Max")}
                            name={maxName}
                            adornment={adornment}
                            options={options}
                            isForYearOfConstruction={isForYearOfConstruction}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};

export default Slider;
