import { Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, Controller } from "react-hook-form";
import RHFDoubleSlider from "src/components/hook-form/RHFDoubleSlider"; // Adjust the import as needed
import RHFSelectDemandForm from "@/components/hook-form/RHFSelectDemandForm";

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

const formatNumber = (value: number) => {
    return value.toLocaleString("de-DE");
};
export const DemandFormSlider: FC<DemandFormSliderProps> = ({
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
    const { setValue, getValues } = useFormContext();

    const minName = `demands[${demandIndex}].filters.${min}`;
    const maxName = `demands[${demandIndex}].filters.${max}`;

    // Initialize the  values to null if they are not set
    useEffect(() => {
        const minValue = getValues(minName);
        const maxValue = getValues(maxName);

        if (minValue === 0 || minValue === "") {
            setValue(minName, null);
        }
        if (maxValue === 0 || maxValue === "") {
            setValue(maxName, null);
        }
    }, [getValues, setValue, minName, maxName]);

    const handleSliderChange = (name: string, value: number[]) => {
        let [minValue, maxValue] = value;

        // Ensure minValue is not greater than maxValue
        if (minValue > maxValue) {
            minValue = maxValue;
        }

        // Set value to default if it matches the default min and max
        setValue(minName, minValue === defaultMin ? defaultMin : minValue);
        setValue(maxName, maxValue === defaultMax ? defaultMax : maxValue);
    };

    const sliderValue = [
        getValues(minName) === null ? defaultMin : getValues(minName),
        getValues(maxName) === null ? defaultMax : getValues(maxName),
    ];

    return (
        <>
            <Typography variant="h6">{label}</Typography>
            <Stack mt={1} px={1}>
                <Controller
                    name={minName}
                    render={({ field }) => (
                        <RHFDoubleSlider
                            {...field}
                            minName={minName}
                            maxName={maxName}
                            min={defaultMin}
                            max={defaultMax}
                            step={step}
                            value={sliderValue}
                            onChange={(event, value) =>
                                handleSliderChange(minName, value as number[])
                            }
                            valueLabelDisplay="auto"
                            isForPrice={isForPrice}
                        />
                    )}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <RHFSelectDemandForm
                            label={t("Min")}
                            name={minName}
                            adornment={adornment}
                            options={options}
                            allowClear
                            isForYearOfConstruction={isForYearOfConstruction}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelectDemandForm
                            label={t("Max")}
                            name={maxName}
                            adornment={adornment}
                            options={options}
                            allowClear
                            isForYearOfConstruction={isForYearOfConstruction}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};
