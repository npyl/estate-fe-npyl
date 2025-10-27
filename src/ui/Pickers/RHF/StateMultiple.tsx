import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import StateMultiplePicker, {
    StateMultiplePickerProps,
} from "@/ui/Pickers/StateMultiple";

interface RHFStateMultiplePickerProps
    extends Omit<StateMultiplePickerProps, "value" | "onChange"> {
    name: string;
}

const RHFStateMultiplePicker: FC<RHFStateMultiplePickerProps> = ({
    name,
    ...props
}) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <StateMultiplePicker
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export default RHFStateMultiplePicker;
