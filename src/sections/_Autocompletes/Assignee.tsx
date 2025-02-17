import {
    Box,
    MenuItem,
    SxProps,
    TextField,
    Theme,
    Typography,
    Button,
} from "@mui/material";
import { forwardRef, useMemo } from "react";
import Autocomplete, { AutocompleteProps } from "@/components/Autocomplete";
import { IUserMini } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth"; // Hook to get logged-in user
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------

const getOptionLabel = (o: IUserMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// -------------------------------------------------------------------------

const AssignToMeButtonSx: SxProps<Theme> = {
    textTransform: "none",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    ":hover": {
        backgroundColor: "transparent !important",
        textDecoration: "underline",
    },
};

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const renderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: IUserMini
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
        </MenuItem>
    );
};

// -------------------------------------------------------------------------

interface AssigneeAutocompleteProps
    extends Omit<AutocompleteProps<IUserMini>, "options" | "renderInput"> {
    label: string;
    error: boolean;
    helperText?: string;
    onAssignToMe: (user: IUserMini) => void;
    isMessagesPage?: boolean;
}

const AssigneeAutocomplete = forwardRef<
    HTMLDivElement,
    AssigneeAutocompleteProps
>(
    (
        {
            label,
            error,
            helperText,
            onAssignToMe,
            isMessagesPage = false,
            ...props
        },
        ref
    ) => {
        const { data, isLoading } = useAllUsersQuery();
        const { t } = useTranslation();
        const { user } = useAuth(); // Get current user

        const options = useMemo(
            () => (Array.isArray(data) ? data : []),
            [data]
        );
        const handleAssignToMe = () => {
            if (user) {
                onAssignToMe({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                });
            }
        };

        return (
            <Box>
                <Autocomplete
                    ref={ref}
                    loading={isLoading}
                    renderOption={renderOption}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    renderInput={(params) => {
                        const selectedUser = params.inputProps.value
                            ? options.find(
                                  (user) =>
                                      getOptionLabel(user) ===
                                      params.inputProps.value
                              )
                            : null;

                        return (
                            <TextField
                                {...params}
                                label={label}
                                error={error}
                                helperText={helperText}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: selectedUser ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Avatar
                                                src={selectedUser.avatar}
                                                firstName={
                                                    selectedUser.firstName
                                                }
                                                lastName={selectedUser.lastName}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    marginInline: 0.6,
                                                }}
                                            />
                                        </Box>
                                    ) : null,
                                }}
                            />
                        );
                    }}
                    {...props}
                />

                {/* Assign to Me Section */}
                {!isMessagesPage && user && (
                    <Button
                        variant="text"
                        color="primary"
                        sx={AssignToMeButtonSx}
                        onClick={handleAssignToMe}
                    >
                        {t("Assign to me")}
                    </Button>
                )}
            </Box>
        );
    }
);

AssigneeAutocomplete.displayName = "AssigneeAutocomplete";

export default AssigneeAutocomplete;
