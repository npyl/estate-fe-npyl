import { MenuItem, SxProps, TextField, Theme, Typography } from "@mui/material";
import { forwardRef, useCallback, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { IUser } from "@/types/user";
import Avatar from "@/components/Avatar";
import { useAllUsersQuery } from "@/services/user";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------

const getOptionLabel = (o: IUser | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: IUser
) => {
    const { key, ...otherProps } = props;
    return (
        <MenuItem sx={OptionSx} key={option.id} {...otherProps}>
            <Avatar
                src={option?.avatar}
                firstName={option?.firstName}
                lastName={option?.lastName}
            />
            <Typography>
                {option?.firstName || ""} {option?.lastName || ""}
            </Typography>
            {option?.workspaceEmail ? (
                <Typography fontWeight="bold">
                    ({option.workspaceEmail || ""})
                </Typography>
            ) : null}
        </MenuItem>
    );
};

// ------------------------------------------------------------------

const getOptionDisabled = ({ workspaceEmail }: IUser) => !workspaceEmail;

// ------------------------------------------------------------------

interface AssigneeAutocompleteProps
    extends Omit<
        AutocompleteProps<IUser, false, false, false>,
        "options" | "renderInput"
    > {
    label: string;
    error: boolean;
    helperText?: string;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(({ label, error, helperText, ...props }, ref) => {
    const { t } = useTranslation();

    const { data, isLoading } = useAllUsersQuery();

    // INFO: options sorted first by whether they have workspaceEmail.
    const options = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return [...data].sort((a, b) => {
            if (a.workspaceEmail && !b.workspaceEmail) return -1;
            if (!a.workspaceEmail && b.workspaceEmail) return 1;
            // If both have or don't have workspaceEmail, return the first
            return -1;
        });
    }, [data]);

    const groupBy = useCallback(
        ({ workspaceEmail }: IUser) =>
            workspaceEmail ? t("with google email") : t("without google email"),
        [t]
    );

    return (
        <Autocomplete
            ref={ref}
            clearIcon={null}
            loading={isLoading}
            renderOption={RenderOption}
            getOptionDisabled={getOptionDisabled}
            options={options}
            getOptionLabel={getOptionLabel}
            groupBy={groupBy}
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
