import { SxProps, TextField, Theme } from "@mui/material";
import { useAllUsersQuery } from "@/services/user";
import { IUser, IUserMini } from "@/types/user";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";
import getRenderOption, { RenderOption } from "./getRenderOption";

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

type ManagerAutocompleteProps = Omit<
    AutocompleteProps<IUserMini, false, true>,
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

export { getOptionLabel, RenderOption };
export type { ManagerAutocompleteProps };
export default ManagerAutocomplete;
