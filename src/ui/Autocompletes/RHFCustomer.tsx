import { Controller, useFormContext } from "react-hook-form";
import CustomerAutocomplete, {
    CustomerAutocompleteProps,
} from "@/ui/Autocompletes/Customer";
import { FC } from "react";

interface RHFCustomerProps
    extends Omit<CustomerAutocompleteProps, "value" | "onChange"> {
    name: string;
}

const RHFCustomer: FC<RHFCustomerProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <CustomerAutocomplete
                    ref={ref as any}
                    {...field}
                    {...props}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export type { RHFCustomerProps };
export default RHFCustomer;
