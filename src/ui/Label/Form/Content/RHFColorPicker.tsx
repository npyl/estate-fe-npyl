import { Controller, useFormContext } from "react-hook-form";
import { ILabelForm } from "../types";
import ColorPicker from "@/components/ColorPicker";

const RHFColorPicker = () => {
    const { control } = useFormContext<ILabelForm>();

    return (
        <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange } }) => (
                <ColorPicker color={value} onColorChange={onChange} />
            )}
        />
    );
};

export default RHFColorPicker;
