import { useTranslation } from "react-i18next";
import CustomerAutocompleteSingle from "@/sections/CustomerAutocompleteSingle";
import { Controller, useFormContext } from "react-hook-form";
import { ILabelForm } from "../types";

const RHFCustomerSelect = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<ILabelForm>();
    return (
        <Controller
            name="resourceId"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <CustomerAutocompleteSingle
                    {...field}
                    label={t("Customer")}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default RHFCustomerSelect;
