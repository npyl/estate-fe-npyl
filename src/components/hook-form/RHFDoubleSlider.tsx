import { useFormContext, useWatch } from "react-hook-form";
import { Slider, SliderProps } from "@mui/material";
import { FC, useCallback } from "react";

// ----------------------------------------------------------------------

type Props = SliderProps & {
    minName: string;
    maxName: string;
    isForPrice?: boolean; //it is used to have the appropriate format for price in the slider's tooltip
};

const RHFDoubleSlider: FC<Props> = ({
    minName,
    maxName,
    isForPrice = false,
    ...other
}) => {
    const { setValue } = useFormContext();

    const min = useWatch({ name: minName });
    const max = useWatch({ name: maxName });

    const formatValue = (value: number) => {
        return isForPrice ? value.toLocaleString("de-DE") : value.toString();
    };

    const handleChange = useCallback(
        (_: any, value: number | number[]) => {
            if (!Array.isArray(value)) return;
            setValue(minName, value[0], { shouldDirty: true });
            setValue(maxName, value[1], { shouldDirty: true });
        },
        [minName, maxName]
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
};

export default RHFDoubleSlider;
