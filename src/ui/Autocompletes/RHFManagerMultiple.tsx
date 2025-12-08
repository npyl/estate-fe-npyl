import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import ManagerMultipleAutocomplete, {
    ManagerMultipleAutocompleteProps,
} from "./ManagerMultiple";

interface RHFManagerMultipleAutocompleteProps
    extends Omit<ManagerMultipleAutocompleteProps, "value" | "onChange"> {
    name: string;
}

const RHFManagerMultipleAutocomplete: FC<
    RHFManagerMultipleAutocompleteProps
> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field } }) => (
                <ManagerMultipleAutocomplete
                    ref={ref as any}
                    {...field}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFManagerMultipleAutocompleteProps };
export default RHFManagerMultipleAutocomplete;
