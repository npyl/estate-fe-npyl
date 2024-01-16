// form
import { useFormContext } from "react-hook-form";
// @mui
import { Slider, SliderProps } from "@mui/material";
import { useCallback } from "react";

// ----------------------------------------------------------------------

type Props = SliderProps & {
    minName: string;
    maxName: string;
};

export default function RHFSlider({ minName, maxName, ...other }: Props) {
    const { watch, setValue } = useFormContext();

    const min = watch(minName);
    const max = watch(maxName);

    const handleChange = useCallback((e: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            setValue(minName, value[0]);
            setValue(maxName, value[1]);
        }
    }, []);

    return <Slider value={[min, max]} onChange={handleChange} {...other} />;
}
