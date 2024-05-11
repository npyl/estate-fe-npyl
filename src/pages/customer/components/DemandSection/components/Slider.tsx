import {
    Grid,
    InputAdornment,
    SliderProps,
    Stack,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RHFDoubleSlider, RHFTextField } from "src/components/hook-form";

type DemandFormSliderProps = Omit<SliderProps, "min" | "max"> & {
    label: any;
    min: string;
    max: string;
    defaultMin: number;
    defaultMax: number;
    demandIndex: number;
    adornment?: string;
    step?: number;
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
}) => {
    const { t } = useTranslation();

    const minName = `demands[${demandIndex}].filters.${min}`;
    const maxName = `demands[${demandIndex}].filters.${max}`;

    return (
        <>
            <Typography variant="h6">{label}</Typography>
            <Stack mt={1} px={1}>
                <RHFDoubleSlider
                    orientation="horizontal"
                    minName={minName}
                    maxName={maxName}
                    valueLabelDisplay="auto"
                    min={defaultMin}
                    max={defaultMax}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <RHFTextField
                            label={t("Min")}
                            name={minName}
                            type="number"
                            InputProps={{
                                endAdornment: adornment ? (
                                    <InputAdornment position="end">
                                        {adornment}
                                    </InputAdornment>
                                ) : null,
                                inputProps: {
                                    step,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            label={t("Max")}
                            name={maxName}
                            type="number"
                            InputProps={{
                                endAdornment: adornment ? (
                                    <InputAdornment position="end">
                                        {adornment}
                                    </InputAdornment>
                                ) : null,
                                inputProps: {
                                    step,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};
