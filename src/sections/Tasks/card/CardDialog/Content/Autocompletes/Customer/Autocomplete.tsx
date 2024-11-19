import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "./types";
import renderUserTags from "./renderUserTags";

// ------------------------------------------------------------------

const getOptionLabel = (o: ICustomerMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: string },
    option: ICustomerMini
) => {
    const { key: _, ...otherProps } = props;
    return (
        <MenuItem sx={OptionSx} key={option.id} {...otherProps}>
            {option.firstName} {option.lastName}
        </MenuItem>
    );
};

// -------------------------------------------------------------------

interface CustomerAutocompleteProps
    extends Omit<
        AutocompleteProps<ICustomerMini, true>,
        "options" | "renderInput"
    > {
    label: string;
    error: boolean;
    helperText?: string;
}
const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteProps
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
                <TextField
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

export default CustomerAutocomplete;
