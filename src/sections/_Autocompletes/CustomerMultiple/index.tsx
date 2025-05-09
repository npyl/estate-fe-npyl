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
import { AutocompleteRenderInputParams } from "@mui/material";

// -----------------------------------------------------------------------------

const getDefaultRenderInput =
    (
        label: string | undefined,
        error: boolean | undefined,
        helperText: string | undefined
    ) =>
    (params: AutocompleteRenderInputParams): React.ReactNode => (
        <MultilineTextField
            multiline
            label={label}
            {...params}
            error={error}
            helperText={helperText}
        />
    );

// -----------------------------------------------------------------------------

interface CustomerAutocompleteMultipleProps
    extends Omit<
        AutocompleteProps<ICustomerMini, true, true>,
        "options" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    optionFilter?: (c: ICustomerMini) => boolean;

    // INFO: make optional
    renderInput?: AutocompleteProps<ICustomerMini, true, true>["renderInput"];
}

const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteMultipleProps
>(({ label, error, helperText, optionFilter, renderInput, ...props }, ref) => {
    const { data, isLoading } = useGetNamesQuery();
    const options = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (optionFilter) return data.filter(optionFilter);
        return data;
    }, [data, optionFilter]);

    const defaultRenderInput = useMemo(
        () => getDefaultRenderInput(label, error, helperText),
        [label, error, helperText]
    );

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
            renderInput={renderInput ?? defaultRenderInput}
            {...props}
        />
    );
});

CustomerAutocomplete.displayName = "CustomerAutocomplete";

export type { CustomerAutocompleteMultipleProps };
export default CustomerAutocomplete;
