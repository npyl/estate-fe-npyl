import { Controller, useFormContext } from "react-hook-form";
import { useGetNamesQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";
import { useTranslation } from "react-i18next";
import Autocomplete from "@/components/Autocomplete";
import TextField from "@mui/material/TextField";
import { InputAdornment, ListItem } from "@mui/material";
import PlaceholderAvatar from "@/sections/Tasks/card/CardDialog/Content/Autocompletes/Customer/PlaceholderAvatar";

// ----------------------------------------------------------------------

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: ICustomerMini
) => (
    <ListItem
        {...props}
        key={option.id}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
        <PlaceholderAvatar />
        {option?.firstName || ""} {option?.lastName || ""}
    </ListItem>
);

// ----------------------------------------------------------------------

const getOptionLabel = (o: ICustomerMini | number) =>
    typeof o === "number" ? "" : `${o?.firstName} ${o?.lastName}`;

// ----------------------------------------------------------------------

const OwnerAutocomplete = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    const { data: ownerNames } = useGetNamesQuery();

    return (
        <Controller
            name="ownerId"
            control={control}
            render={({ field, fieldState: { error } }) => {
                // Find the selected owner based on field.value
                const selectedOwner = ownerNames?.find(
                    (owner) => owner.id === field.value
                );

                return (
                    <Autocomplete
                        fullWidth
                        options={ownerNames || []}
                        getOptionLabel={getOptionLabel}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t("Owner")}
                                error={Boolean(error)}
                                helperText={error?.message || ""}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: selectedOwner ? (
                                        <InputAdornment position="start">
                                            <PlaceholderAvatar />
                                        </InputAdornment>
                                    ) : null,
                                }}
                            />
                        )}
                        renderOption={RenderOption}
                        {...field}
                    />
                );
            }}
        />
    );
};

export default OwnerAutocomplete;
