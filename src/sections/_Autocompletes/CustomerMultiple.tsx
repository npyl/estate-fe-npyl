import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "@/types/customer";
import {
    getOptionLabel,
    RenderOption,
} from "@/sections/_Autocompletes/Customer";
import renderUserTags from "@/sections/_Autocompletes/Customer/renderUserTags";
import MultilineTextField from "@/components/MultilineTextField";

interface CustomerAutocompleteMultipleProps
    extends Omit<
        AutocompleteProps<ICustomerMini, true>,
        "options" | "renderInput"
    > {
    label: string;
    error?: boolean;
    helperText?: string;
}

const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteMultipleProps
>(({ label, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useGetNamesQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
            ref={ref}
            loading={isLoading}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderTags={renderUserTags}
            renderInput={(props) => (
                <MultilineTextField
                    multiline
                    label={label}
                    {...props}
                    error={error}
                    helperText={helperText}
                />
            )}
            {...props}
        />
    );
});

CustomerAutocomplete.displayName = "CustomerAutocomplete";

export type { CustomerAutocompleteMultipleProps };
export default CustomerAutocomplete;
