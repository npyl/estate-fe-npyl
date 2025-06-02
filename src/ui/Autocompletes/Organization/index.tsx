import { SxProps, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import renderTags from "./renderTags";
import { IOrganization } from "@/types/organization";
import { useAllOrganizationsQuery } from "@/services/organization";

// ------------------------------------------------------------------

const getOptionLabel = (o: IOrganization | number) =>
    typeof o === "number" ? "" : o?.name || "";

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IOrganization
) => (
    <ListItem {...props} key={option.id} sx={OptionSx}>
        {option?.name || ""}
    </ListItem>
);

// -------------------------------------------------------------------

interface OrganizationAutocompleteProps
    extends Omit<
        AutocompleteProps<IOrganization, false, true>,
        "options" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;
}

const OrganizationAutocomplete = forwardRef<
    HTMLDivElement,
    OrganizationAutocompleteProps
>(({ label, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useAllOrganizationsQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
            ref={ref}
            disableClearable
            loading={isLoading}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderTags={renderTags}
            renderInput={(params) => (
                <TextField
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

OrganizationAutocomplete.displayName = "OrganizationAutocomplete";

export { getOptionLabel, RenderOption };
export type { OrganizationAutocompleteProps };
export default OrganizationAutocomplete;
