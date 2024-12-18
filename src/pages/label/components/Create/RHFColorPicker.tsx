import { SliderPicker } from "react-color";
import { Controller, useFormContext } from "react-hook-form";
import { ILabelForm } from "./types";

const RHFColorPicker = () => {
    const { control } = useFormContext<ILabelForm>();

    return (
        <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange } }) => (
                <SliderPicker
                    color={value}
                    onChangeComplete={(c) => onChange(c.hex)}
                />
            )}
        />
    );
};

export default RHFColorPicker;
