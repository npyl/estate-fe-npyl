import { useFormContext } from "react-hook-form";
import { Slider, SliderProps } from "@mui/material";
import { useCallback } from "react";

// ----------------------------------------------------------------------

type Props = SliderProps & {
    minName: string;
    maxName: string;
    isForPrice?: boolean; //it is used to have the appropriate format for price in the slider's tooltip
};

export default function RHFSlider({
    minName,
    maxName,
    isForPrice = false,
    ...other
}: Props) {
    const { watch, setValue } = useFormContext();

    const min = watch(minName);
    const max = watch(maxName);

    const formatValue = (value: number) => {
        return isForPrice ? value.toLocaleString("de-DE") : value.toString();
    };

    const handleChange = useCallback(
        (e: Event, value: number | number[]) => {
            if (Array.isArray(value)) {
                setValue(minName, value[0]);
                setValue(maxName, value[1]);
            }
        },
        [minName, maxName, setValue]
    );

    return (
        <Slider
            value={[min, max]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={formatValue}
            {...other}
        />
    );
}
