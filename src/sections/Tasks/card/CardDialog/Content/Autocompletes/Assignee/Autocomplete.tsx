import { MenuItem, SxProps, TextField, Theme, Typography } from "@mui/material";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { IUserMini } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";
import Avatar from "@/components/Avatar";

// ------------------------------------------------------------------

const getOptionLabel = (o: IUserMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// -------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

// TODO: fix key not being passed for some weird reason!
const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IUserMini
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        <Avatar
            src={option?.avatar}
            firstName={option?.firstName}
            lastName={option?.lastName}
        />
        <Typography>
            {option?.firstName || ""} {option?.lastName || ""}
        </Typography>
    </MenuItem>
);

// -------------------------------------------------------------------------

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
            renderOption={renderOption}
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
