import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ParentCategoryMultiplePicker, {
    ParentCategoryMultiplePickerProps,
} from "@/ui/Pickers/ParentCategoryMultiple";

interface RHFParentCategoryMultiplePickerProps
    extends Omit<ParentCategoryMultiplePickerProps, "value" | "onChange"> {
    name: string;
}

const RHFParentCategoryMultiplePicker: FC<
    RHFParentCategoryMultiplePickerProps
> = ({ name, ...props }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <ParentCategoryMultiplePicker
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export default RHFParentCategoryMultiplePicker;
