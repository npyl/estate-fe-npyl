import CodeSelect from "@/sections/CodeSelect";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const getOptionLabel = (o: string | number) => (typeof o === "number" ? "" : o);

const PropertySelect = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="propertyId"
            control={control}
            render={({
                field: { onChange, ...field },
                fieldState: { error },
            }) => (
                <CodeSelect
                    getOptionLabel={getOptionLabel}
                    renderInput={(props) => (
                        <TextField
                            label={t("Property")}
                            {...props}
                            error={Boolean(error)}
                            helperText={error?.message}
                        />
                    )}
                    {...field}
                    onChange={(_, v) => onChange(v)}
                />
            )}
        />
    );
};

export default PropertySelect;
