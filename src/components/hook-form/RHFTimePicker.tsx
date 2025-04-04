import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TimePicker, { TimePickerProps } from "@/components/Pickers/TimePicker";

interface RHFTimePickerProps
    extends Omit<TimePickerProps, "value" | "onChange"> {
    name: string;
}

const RHFTimePicker: FC<RHFTimePickerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TimePicker {...field} {...props} />
            )}
        />
    );
};

export default RHFTimePicker;
