import { Controller, useFormContext } from "react-hook-form";
import CustomerAutocompleteMultiple, {
    CustomerAutocompleteMultipleProps,
} from "@/ui/Autocompletes/CustomerMultiple";

interface RHFCustomerAutocompleteMultipleProps<FreeSolo extends boolean = false>
    extends Omit<CustomerAutocompleteMultipleProps<FreeSolo>, "value"> {
    name: string;
}

const RHFCustomer = <FreeSolo extends boolean = false>({
    name,
    onChange: _onChange,
    ...props
}: RHFCustomerAutocompleteMultipleProps<FreeSolo>) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, onChange, ...field },
                fieldState: { error },
            }) => (
                <CustomerAutocompleteMultiple
                    ref={ref as any}
                    onChange={(v) => {
                        _onChange?.(v);
                        onChange(v);
                    }}
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
