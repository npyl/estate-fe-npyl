import {
    Grid,
    InputAdornment,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface DemandFormSliderProps {
    label: any;
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
    handleChange: (event: any, newValue: any, activeThumb: any) => void;
    demandIndex: number;
    setterMin: ActionCreatorWithPayload<any, string>;
    setterMax: ActionCreatorWithPayload<any, string>;
    adornment?: string;
    step?: number;
}

export const DemandFormSlider: FC<DemandFormSliderProps> = ({
    label,
    min,
    max,
    defaultMin,
    defaultMax,
    handleChange,
    demandIndex,
    setterMin,
    setterMax,
    adornment,
    step = 1,
}) => {
    const dispatch = useDispatch();
    const formatNumberWithDots = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const handleFieldChange = (
        setter: any,
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let value: string | number = event.target.value;

        if (
            event.target instanceof HTMLInputElement &&
            event.target.type === "number"
        ) {
            value = event.target.valueAsNumber;
        }

        dispatch(setter({ index, value }));
    };

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
                <Slider
                    orientation="horizontal"
                    value={[min, max]}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={defaultMin}
                    max={defaultMax}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Min"
                            type="number"
                            value={min || ""}
                            onChange={(event) =>
                                handleFieldChange(setterMin, demandIndex, event)
                            }
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
                        <TextField
                            label="Max"
                            type="number"
                            value={max || ""}
                            onChange={(event) =>
                                handleFieldChange(setterMax, demandIndex, event)
                            }
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
