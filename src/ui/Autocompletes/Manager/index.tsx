import { MenuItem, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";
import { FC, forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";
import { getOptionTestId } from "./constant";

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

const getOptionLabel = (o: IUser | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ----------------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 0.5,
    width: "100%",
};

interface RenderOptionProps extends React.HTMLAttributes<HTMLLIElement> {
    option: IUser;
}

const RenderOption: FC<RenderOptionProps> = (props) => {
    const { option, ...otherProps } = props;

    const { id, avatar, firstName, lastName } = option;
    const fullname = `${firstName || ""} ${lastName || ""}`;

    return (
        <MenuItem
            data-testid={getOptionTestId(id)}
            sx={OptionSx}
            {...otherProps}
        >
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

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: IUser
) => {
    const { key, ...other } = props;
    return <RenderOption key={key} option={option} {...other} />;
};

// ----------------------------------------------------------------------------

type ManagerAutocompleteProps = Omit<
    AutocompleteProps<IUser, false, true>,
    "options" | "renderOption" | "renderInput"
> & {
    optionFilter?: (u: IUser) => boolean;
};

const ManagerAutocomplete = forwardRef<
    HTMLDivElement,
    ManagerAutocompleteProps
>(({ optionFilter, ...props }, ref) => {
    const { t } = useTranslation();

    // INFO: for playwright
    const TEST_ID = (props as any)?.["data-testid"];

    const { data, isLoading } = useAllUsersQuery();
    const options = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (optionFilter) return data.filter(optionFilter);
        return data;
    }, [data, optionFilter]);

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
            renderOption={getRenderOption}
            renderInput={({ InputProps, ...params }) => (
                <TextField
                    data-testid={TEST_ID}
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

export { RenderOption };
export type { ManagerAutocompleteProps };
export default ManagerAutocomplete;
