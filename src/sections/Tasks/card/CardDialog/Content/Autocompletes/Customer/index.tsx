import { useTranslation } from "react-i18next";
import CustomerAutocomplete from "./Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import renderUserTags from "./renderUserTags";

const RHFCustomerSelect = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="customers"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <CustomerAutocomplete
                    multiple
                    label={t("Customers")}
                    renderTags={renderUserTags}
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFCustomerSelect;
