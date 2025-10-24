import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CategoryMultiplePicker, {
    CategoryMultiplePickerProps,
} from "@/ui/Pickers/CategoryMultiple";

type OmitList = "parentCategories" | "value" | "onChange";

interface RHFCategoryMultiplePickerProps
    extends Omit<CategoryMultiplePickerProps, OmitList> {
    parentCategoriesName: string;
    name: string;
}

const RHFCategoryMultiplePicker: FC<RHFCategoryMultiplePickerProps> = ({
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
                        <CategoryMultiplePicker
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

export default RHFCategoryMultiplePicker;
