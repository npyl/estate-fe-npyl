import OriginalGoogleLogo from "@/assets/logo/OriginalGoogleLogo";
import { useAllUsersQuery } from "@/services/user";
import InputAdornment from "@mui/material/InputAdornment";
import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { GUserMini } from "@/types/user";
import { SxProps, Theme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Avatar from "@/components/Avatar";
import { FC, forwardRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetUsersQuery } from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import TextField from "@mui/material/TextField";

// --------------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: GUserMini
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
            <Typography fontWeight="bold">({option?.id})</Typography>
        </MenuItem>
    );
};

// --------------------------------------------------------------------------------

const getOptionLabel = (o: GUserMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// --------------------------------------------------------------------------------

interface AutocompleteProps
    extends Omit<
        MuiAutocompleteProps<GUserMini, false, false, false>,
        "value" | "options" | "renderInput"
    > {
    value?: string;

    label: string;
    error: boolean;
    helperText?: string;
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
    ({ value: _value, label, error, helperText, ...props }, ref) => {
        const { t } = useTranslation();

        const { user } = useAuth();
        const { data: gwUsers } = useGetUsersQuery(user?.id!);
        const { data: ppUsers } = useAllUsersQuery();

        /**
         * Method that checks whether a gw-user's email has been assigned to a pp-user
         */
        const findPPUserWithGoogleWorkspaceEmail = useCallback(
            (workspaceEmail: string) =>
                Boolean(
                    ppUsers?.find((u) => u.workspaceEmail === workspaceEmail)
                ),
            [ppUsers]
        );

        const getOptionDisabled = useCallback(
            ({ id }: GUserMini) => findPPUserWithGoogleWorkspaceEmail(id),
            [findPPUserWithGoogleWorkspaceEmail]
        );

        const groupBy = useCallback(
            ({ id }: GUserMini) =>
                findPPUserWithGoogleWorkspaceEmail(id)
                    ? t("taken google emails")
                    : t("free google emails"),
            [t, findPPUserWithGoogleWorkspaceEmail]
        );

        // INFO: sort gwUsers so that the ones without pp-user association appear first
        const sortedGwUsers = useMemo(() => {
            if (!gwUsers) return [];

            return [...gwUsers].sort((a, b) => {
                const aHasPPUser = findPPUserWithGoogleWorkspaceEmail(a.id);
                const bHasPPUser = findPPUserWithGoogleWorkspaceEmail(b.id);

                if (!aHasPPUser && bHasPPUser) return -1;
                if (aHasPPUser && !bHasPPUser) return 1;

                return -1;
            });
        }, [gwUsers, findPPUserWithGoogleWorkspaceEmail]);

        const value = useMemo(
            () => gwUsers?.find(({ id }) => id === _value) || null!,
            [_value, gwUsers]
        );

        return (
            <MuiAutocomplete
                ref={ref}
                fullWidth
                value={value}
                options={sortedGwUsers}
                getOptionDisabled={getOptionDisabled}
                getOptionLabel={getOptionLabel}
                renderOption={RenderOption}
                groupBy={groupBy}
                renderInput={(params) => (
                    <TextField
                        label={label}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <OriginalGoogleLogo />
                                </InputAdornment>
                            ),
                        }}
                        error={error}
                        helperText={helperText}
                    />
                )}
                {...props}
            />
        );
    }
);

Autocomplete.displayName = "WorkspaceAutocomplete";

export default Autocomplete;
