import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ParentCategoryPicker, {
    ParentCategoryPickerProps,
} from "./_ParentCategory";

interface RHFParentCategoryPickerProps
    extends Omit<ParentCategoryPickerProps, "value" | "onChange"> {
    name: string;
}

const RHFParentCategoryPicker: FC<RHFParentCategoryPickerProps> = ({
    name,
    ...props
}) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <ParentCategoryPicker
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export default RHFParentCategoryPicker;
