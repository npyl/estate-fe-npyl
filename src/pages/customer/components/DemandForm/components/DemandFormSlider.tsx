import { Grid, InputAdornment, Typography } from "@mui/material";
import { FC } from "react";
import { RHFDoubleSlider, RHFTextField } from "src/components/hook-form";

interface DemandFormSliderProps {
    label: any;
    min: string;
    max: string;
    defaultMin: number;
    defaultMax: number;
    demandIndex: number;
    adornment?: string;
    step?: number;
}

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
    const minName = `demands[${demandIndex}].${min}`;
    const maxName = `demands[${demandIndex}].${max}`;

    return (
        <>
            <Typography variant="h6">{label}</Typography>
            <Grid
                container
                direction={"row"}
                spacing={1}
                paddingTop={2}
                paddingLeft={3}
                paddingRight={3}
            >
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
                            label="Min"
                            name={minName}
                            type="number"
                            InputProps={{
                                endAdornment: adornment ? (
                                    <InputAdornment position="end">
                                        {adornment}
                                    </InputAdornment>
                                ) : (
                                    <></>
                                ),
                                inputProps: {
                                    step: step,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            label="Max"
                            name={maxName}
                            type="number"
                            InputProps={{
                                endAdornment: adornment ? (
                                    <InputAdornment position="end">
                                        {adornment}
                                    </InputAdornment>
                                ) : (
                                    <></>
                                ),
                                inputProps: {
                                    step: step,
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
