import { Controller, useFormContext } from "react-hook-form";
import { useGetNamesQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";
import { useTranslation } from "react-i18next";
import Autocomplete from "@/components/Autocomplete";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: ICustomerMini
) => (
    <li {...props} key={option.id}>
        {option?.firstName || ""} {option?.lastName || ""}
    </li>
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
            render={({ field, fieldState: { error } }) => (
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
                        />
                    )}
                    renderOption={RenderOption}
                    {...field}
                />
            )}
        />
    );
};

export default OwnerAutocomplete;
