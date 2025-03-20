import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import CustomerAutocompleteMultiple, {
    CustomerAutocompleteMultipleProps,
} from "./CustomerMultiple";

interface RHFCustomerAutocompleteMultipleProps
    extends CustomerAutocompleteMultipleProps {
    name: string;
}

const RHFCustomer: FC<RHFCustomerAutocompleteMultipleProps> = ({
    name,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <CustomerAutocompleteMultiple
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

export type { RHFCustomerAutocompleteMultipleProps };
export default RHFCustomer;
