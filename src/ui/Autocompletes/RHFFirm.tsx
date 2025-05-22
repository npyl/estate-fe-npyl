import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import FirmAutocomplete, { FirmAutocompleteProps } from "./Firm";

interface RHFFirmAutocompleteProps
    extends Omit<FirmAutocompleteProps, "value" | "renderInput" | "onChange"> {
    name: string;
    label?: string;
}

const RHFFirm: FC<RHFFirmAutocompleteProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, value, onChange, ...field },
                fieldState: { error },
            }) => (
                <FirmAutocomplete
                    ref={ref as any}
                    fullWidth
                    label={label}
                    {...field}
                    {...props}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export type { RHFFirmAutocompleteProps };
export default RHFFirm;
