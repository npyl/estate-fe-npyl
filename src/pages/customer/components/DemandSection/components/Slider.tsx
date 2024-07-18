import { Grid, InputAdornment, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RHFDoubleSlider } from "src/components/hook-form";
import RHFSelectDemandForm from "@/components/hook-form/RHFSelectDemandForm";

// Function for the format of the options from '10,000' to '10.000'
const formatNumber = (value: number) => {
    return value.toLocaleString("de-DE"); // Using German locale for formatting with periods
};

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
                        <RHFSelectDemandForm
                            label={t("Min")}
                            name={minName}
                            adornment={adornment}
                            options={options}
                            children={""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelectDemandForm
                            label={t("Max")}
                            name={maxName}
                            adornment={adornment}
                            options={options}
                            children={""}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};
