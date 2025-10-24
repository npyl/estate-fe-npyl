import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CategoryPicker, { CategoryPickerProps } from "./_Category";

interface RHFCategoryPickerProps
    extends Omit<CategoryPickerProps, "value" | "onChange"> {
    name: string;
}

const RHFCategoryPicker: FC<RHFCategoryPickerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <CategoryPicker value={value} onChange={onChange} {...props} />
            )}
        />
    );
};

export default RHFCategoryPicker;
