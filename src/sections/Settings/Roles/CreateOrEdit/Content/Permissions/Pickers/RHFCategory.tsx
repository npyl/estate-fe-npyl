import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CategoryPicker, { CategoryPickerProps } from "./_Category";

type OmitList = "parentCategories" | "value" | "onChange";

interface RHFCategoryPickerProps extends Omit<CategoryPickerProps, OmitList> {
    parentCategoriesName: string;
    name: string;
}

const RHFCategoryPicker: FC<RHFCategoryPickerProps> = ({
    parentCategoriesName,
    name,
    ...props
}) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={parentCategoriesName}
            render={({ field: { value: parentCategories } }) => (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <CategoryPicker
                            parentCategories={parentCategories}
                            // ...
                            value={value}
                            onChange={onChange}
                            {...props}
                        />
                    )}
                />
            )}
        />
    );
};

export default RHFCategoryPicker;
