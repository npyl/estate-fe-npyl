import { ForwardedRef, forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "@/types/customer";
import {
    getOptionLabel,
    RenderOption,
} from "@/sections/_Autocompletes/Customer";
import MultilineTextField from "@/components/MultilineTextField";
import renderUserTags, { getTagClassname } from "./renderUserTags";
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

interface CustomerAutocompleteMultipleProps<FreeSolo extends boolean = false>
    extends Omit<
        AutocompleteProps<ICustomerMini, true, true, FreeSolo>,
        "options" | "renderInput" | "renderOption" | "renderTags"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    optionFilter?: (c: ICustomerMini) => boolean;

    // INFO: make optional
    renderInput?: AutocompleteProps<
        ICustomerMini,
        true,
        true,
        FreeSolo
    >["renderInput"];
}

function UnforwardedCustomerAutocomplete<FreeSolo extends boolean = false>(
    {
        label,
        error,
        helperText,
        optionFilter,
        renderInput,
        ...props
    }: CustomerAutocompleteMultipleProps<FreeSolo>,
    ref: ForwardedRef<HTMLElement>
) {
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
            getOptionLabel={getOptionLabel as any}
            renderTags={renderUserTags}
            renderInput={renderInput ?? defaultRenderInput}
            {...props}
        />
    );
}

const CustomerAutocomplete = forwardRef(UnforwardedCustomerAutocomplete) as <
    FreeSolo extends boolean = false,
>(
    props: CustomerAutocompleteMultipleProps<FreeSolo> & {
        ref?: ForwardedRef<HTMLElement>;
    }
) => JSX.Element;

UnforwardedCustomerAutocomplete.displayName = "CustomerAutocomplete";

export { getTagClassname };
export type { CustomerAutocompleteMultipleProps };
export default CustomerAutocomplete;
