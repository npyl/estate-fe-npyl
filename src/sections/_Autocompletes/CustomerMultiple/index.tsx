import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "@/types/customer";
import {
    getOptionLabel,
    RenderOption,
} from "@/sections/_Autocompletes/Customer";
import MultilineTextField from "@/components/MultilineTextField";
import renderUserTags from "./renderUserTags";

interface CustomerAutocompleteMultipleProps
    extends Omit<
        AutocompleteProps<ICustomerMini, true, true>,
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
            multiple
            disableClearable
            loading={isLoading}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderTags={renderUserTags}
            renderInput={(params) => (
                <MultilineTextField
                    multiline
                    label={label}
                    {...params}
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
