import { Controller, useFormContext } from "react-hook-form";
import ManagerAutocomplete, { ManagerAutocompleteProps } from "./Manager";
import { FC } from "react";

interface RHFManagerProps
    extends Omit<ManagerAutocompleteProps, "value" | "onChange"> {
    name: string;
}

const RHFManagerAutocomplete: FC<RHFManagerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field } }) => (
                <ManagerAutocomplete ref={ref as any} {...field} {...props} />
            )}
        />
    );
};

export default RHFManagerAutocomplete;
