import { MenuItem, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useAllUsersQuery } from "src/services/user";
import { IUserMini } from "@/types/user";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";

// ------------------------------------------------------------------

const TextFieldSx: SxProps<Theme> = {
    minWidth: 220,
};

const AvatarSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    marginInline: 0.6,
};

// ------------------------------------------------------------------

const getOptionLabel = (o: IUserMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ----------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 0.5,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: IUserMini
) => {
    const { key, ...otherProps } = props;

    const { avatar, firstName, lastName } = option;
    const fullname = `${firstName || ""} ${lastName || ""}`;

    return (
        <MenuItem sx={OptionSx} key={option.id} {...otherProps}>
            <Avatar
                src={avatar}
                firstName={firstName}
                lastName={lastName}
                sx={{ width: 22, height: 22 }}
            />
            <Typography>{fullname}</Typography>
        </MenuItem>
    );
};

// ----------------------------------------------------------------------------

type ManagerAutocompleteProps = Omit<
    AutocompleteProps<IUserMini, false, true>,
    "options" | "renderOption" | "renderInput"
>;

const ManagerAutocomplete = forwardRef<
    HTMLDivElement,
    ManagerAutocompleteProps
>((props, ref) => {
    const { t } = useTranslation();

    const { data, isLoading } = useAllUsersQuery();
    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const selectedUser = useMemo(
        () => options?.find(({ id }) => id === props?.value),
        [options, props?.value]
    );

    return (
        <Autocomplete
            ref={ref}
            loading={isLoading}
            disableClearable
            options={options}
            getOptionLabel={getOptionLabel}
            renderOption={RenderOption}
            renderInput={({ InputProps, ...params }) => (
                <TextField
                    label={t("Manager")}
                    sx={TextFieldSx}
                    InputProps={{
                        ...InputProps,
                        startAdornment: selectedUser ? (
                            <Avatar
                                src={selectedUser.avatar}
                                firstName={selectedUser.firstName}
                                lastName={selectedUser.lastName}
                                sx={AvatarSx}
                            />
                        ) : null,
                    }}
                    {...params}
                />
            )}
            {...props}
        />
    );
});

ManagerAutocomplete.displayName = "ManagerAutocomplete";

export type { ManagerAutocompleteProps };
export default ManagerAutocomplete;
