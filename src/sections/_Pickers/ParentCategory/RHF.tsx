import { Controller, useFormContext } from "react-hook-form";
import ParentCategoryPicker from ".";
import { FC } from "react";

interface Props {
    name: string;
}

const RHFParentCategoryPicker: FC<Props> = ({ name }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <ParentCategoryPicker value={value} onClick={onChange} />
            )}
        />
    );
};

export default RHFParentCategoryPicker;
