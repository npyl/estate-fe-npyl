import CodeSelect from "@/sections/CodeSelect";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PropertySelect = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="propertyId"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <CodeSelect
                    {...field}
                    renderInput={(props) => (
                        <TextField
                            label={t("Property")}
                            error={Boolean(error)}
                            helperText={error?.message}
                            {...props}
                        />
                    )}
                />
            )}
        />
    );
};

export default PropertySelect;
