import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import RolesMultipleAutocomplete, {
    RolesMultipleAutocompleteProps,
} from "./RolesMultiple";

interface RHFRolesMultipleAutocompleteProps
    extends Omit<RolesMultipleAutocompleteProps, "value" | "onChange"> {
    name: string;
}

const RHFRolesMultipleAutocomplete: FC<RHFRolesMultipleAutocompleteProps> = ({
    name,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field } }) => (
                <RolesMultipleAutocomplete
                    ref={ref as any}
                    {...field}
                    {...props}
                />
            )}
        />
    );
};

export default RHFRolesMultipleAutocomplete;
