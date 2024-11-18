import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { useAllCustomersQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { ICustomerMini } from "./types";

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
    props: React.HTMLAttributes<HTMLLIElement>,
    option: ICustomerMini
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        {option.firstName} {option.lastName}
    </MenuItem>
);

// -------------------------------------------------------------------

interface CustomerAutocompleteProps
    extends Omit<AutocompleteProps<ICustomerMini>, "options" | "renderInput"> {
    label: string;
    error: boolean;
    helperText?: string;
}
const CustomerAutocomplete = forwardRef<
    HTMLDivElement,
    CustomerAutocompleteProps
>(({ label, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useAllCustomersQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete<ICustomerMini>
            ref={ref}
            loading={isLoading}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
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
