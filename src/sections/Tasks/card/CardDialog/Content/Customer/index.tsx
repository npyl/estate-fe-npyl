import { useTranslation } from "react-i18next";
import CustomerAutocomplete from "./Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

const RHFCustomerSelect = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="customerId"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <CustomerAutocomplete
                    label={t("Customer")}
                    {...field}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFCustomerSelect;
