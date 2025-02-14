import { MenuItem, SxProps, TextField, Theme, Avatar } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import renderUserTags from "./renderUserTags";
import { ICustomerMini } from "@/types/customer";
import MultilineTextField from "@/components/MultilineTextField";

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

const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`;
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: string },
    option: ICustomerMini
) => {
    const { key: _, ...otherProps } = props;
    return (
        <MenuItem sx={OptionSx} key={option.id} {...otherProps}>
            <Avatar
                sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    color: "white",
                }}
            >
                {/* If we want the avatar to inculde first letter of firstName and lastName uncomment the following  */}
                {/* {getInitials(option.firstName, option.lastName)}    */}
            </Avatar>
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

export default CustomerAutocomplete;
