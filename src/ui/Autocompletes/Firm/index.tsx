import { SxProps, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import renderTags from "./renderTags";
import { IFirm } from "@/types/firm";
import { useAllFirmsQuery } from "@/services/firm";

// ------------------------------------------------------------------

const getOptionLabel = (o: IFirm | number) =>
    typeof o === "number" ? "" : o?.name || "";

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IFirm
) => (
    <ListItem {...props} key={option.id} sx={OptionSx}>
        {option?.name || ""}
    </ListItem>
);

// -------------------------------------------------------------------

interface FirmAutocompleteProps
    extends Omit<
        AutocompleteProps<IFirm, false, true>,
        "options" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;
}

const FirmAutocomplete = forwardRef<HTMLDivElement, FirmAutocompleteProps>(
    ({ label, error, helperText, ...props }, ref) => {
        const { data, isLoading } = useAllFirmsQuery();
        const options = useMemo(
            () => (Array.isArray(data) ? data : []),
            [data]
        );

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
    }
);

FirmAutocomplete.displayName = "FirmAutocomplete";

export { getOptionLabel, RenderOption };
export type { FirmAutocompleteProps };
export default FirmAutocomplete;
