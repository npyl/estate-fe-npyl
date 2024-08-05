import { Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
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
    options?: number[];
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
    options = [],
}) => {
    const { t } = useTranslation();
    const { setValue, getValues } = useFormContext();

    const minName = `demands[${demandIndex}].filters.${min}`;
    const maxName = `demands[${demandIndex}].filters.${max}`;

    const handleSliderChange = (name: string, value: number | number[]) => {
        if (Array.isArray(value)) {
            const [minValue, maxValue] = value;
            setValue(minName, minValue);
            setValue(maxName, maxValue);
        }
    };

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
                            value={[
                                getValues(minName) ?? defaultMin,
                                getValues(maxName) ?? defaultMax,
                            ]}
                            onChange={(event, value) =>
                                handleSliderChange(minName, value)
                            }
                            valueLabelDisplay="auto"
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
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelectDemandForm
                            label={t("Max")}
                            name={maxName}
                            adornment={adornment}
                            options={options}
                            allowClear
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};
