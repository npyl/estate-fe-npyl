import { Controller, useFormContext } from "react-hook-form";
import ColorPicker, { ColorPickerProps } from "@/components/ColorPicker";
import { FC } from "react";

interface RHFColorPickerProps
    extends Omit<ColorPickerProps, "color" | "onColorChange"> {
    name: string;
}

const RHFColorPicker: FC<RHFColorPickerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <ColorPicker
                    color={value}
                    onColorChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export default RHFColorPicker;
