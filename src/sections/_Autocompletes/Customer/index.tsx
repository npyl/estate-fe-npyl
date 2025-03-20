import { SxProps, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import InputAdornment from "@mui/material/InputAdornment";
import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import renderUserTags from "./renderUserTags";
import { ICustomerMini } from "@/types/customer";
import PlaceholderAvatar from "./PlaceholderAvatar";

// ------------------------------------------------------------------

const getOptionLabel = (o: ICustomerMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: ICustomerMini
) => (
    <ListItem {...props} key={option.id} sx={OptionSx}>
        <PlaceholderAvatar />
        {option?.firstName || ""} {option?.lastName || ""}
    </ListItem>
);

// -------------------------------------------------------------------

interface CustomerAutocompleteProps
    extends Omit<
        AutocompleteProps<ICustomerMini, false, true>,
        "options" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;
}

const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteProps
>(({ label, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useGetNamesQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const selectedOwner = useMemo(
        () => options?.find(({ id }) => id === props?.value),
        [options, props?.value]
    );

    return (
        <Autocomplete
            ref={ref}
            disableClearable
            loading={isLoading}
            renderOption={RenderOption}
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
