import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { IUserMini } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";

const getOptionLabel = ({ firstName, lastName }: IUserMini) =>
    `${firstName} ${lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IUserMini
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        {option.firstName} {option.lastName}
    </MenuItem>
);

interface AssigneeAutocompleteProps
    extends Omit<AutocompleteProps<IUserMini>, "options" | "renderInput"> {
    label: string;
    error: boolean;
    helperText?: string;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(({ label, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useAllUsersQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
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

AssigneeAutocomplete.displayName = "AssigneeAutocomplete";

export default AssigneeAutocomplete;
