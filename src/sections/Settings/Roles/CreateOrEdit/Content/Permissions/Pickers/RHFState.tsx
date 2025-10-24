import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import StatePicker, { StatePickerProps } from "./_State";

interface RHFStatePickerProps
    extends Omit<StatePickerProps, "value" | "onChange"> {
    name: string;
}

const RHFStatePicker: FC<RHFStatePickerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <StatePicker value={value} onChange={onChange} {...props} />
            )}
        />
    );
};

export default RHFStatePicker;
