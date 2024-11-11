import { MenuItem, SxProps, TextField, Theme, Typography } from "@mui/material";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { GUserMini } from "@/types/user";
import Avatar from "@/components/Avatar";
import { useGetUsersQuery } from "@/services/calendar";

// ------------------------------------------------------------------

const getOptionLabel = (o: GUserMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: GUserMini
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
        <Typography fontWeight="bold">({`${option?.id || ""}`})</Typography>
    </MenuItem>
);

// TODO: I have a stupid any here!
interface AssigneeAutocompleteProps
    extends Omit<AutocompleteProps<any>, "options" | "renderInput"> {
    label: string;
    error: boolean;
    helperText?: string;

    adminId?: number;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(({ label, adminId = -1, error, helperText, ...props }, ref) => {
    const { data, isLoading } = useGetUsersQuery(adminId, {
        skip: adminId === -1,
    });
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    return (
        <Autocomplete
            ref={ref}
            clearIcon={null}
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

AssigneeAutocomplete.displayName = "GoogleAssigneeAutocomplete";

export default AssigneeAutocomplete;
