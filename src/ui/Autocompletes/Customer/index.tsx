import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import renderUserTags from "./renderUserTags";
import { ICustomerMini } from "@/types/customer";
import PlaceholderAvatar from "./PlaceholderAvatar";
import getRenderOption, { RenderOption } from "./getRenderOption";

// ------------------------------------------------------------------

const getOptionLabel = (o: ICustomerMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// -------------------------------------------------------------------

interface CustomerAutocompleteProps
    extends Omit<
        AutocompleteProps<ICustomerMini, false, true>,
        "options" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;

    optionFilter?: (c: ICustomerMini) => boolean;
}

const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteProps
>(({ label, error, helperText, optionFilter, ...props }, ref) => {
    const { data, isLoading } = useGetNamesQuery();
    const options = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (optionFilter) return data.filter(optionFilter);
        return data;
    }, [data, optionFilter]);

    const selectedOwner = useMemo(
        () => options?.find(({ id }) => id === props?.value),
        [options, props?.value]
    );

    return (
        <Autocomplete
            ref={ref}
            disableClearable
            loading={isLoading}
            renderOption={getRenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderTags={renderUserTags}
            renderInput={({ InputProps, ...params }) => (
                <TextField
                    label={label}
                    {...params}
                    error={error}
                    helperText={helperText}
                    InputProps={{
                        ...InputProps,
                        startAdornment: selectedOwner ? (
                            <InputAdornment position="start">
                                <PlaceholderAvatar />
                            </InputAdornment>
                        ) : null,
                    }}
                />
            )}
            {...props}
        />
    );
});

CustomerAutocomplete.displayName = "CustomerAutocomplete";

export { getOptionLabel, RenderOption };
export type { CustomerAutocompleteProps };
export default CustomerAutocomplete;
