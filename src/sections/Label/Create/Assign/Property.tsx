import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import CodeSelect from "@/sections/CodeSelect";
import { ILabelForm } from "../types";
import { useTranslation } from "react-i18next";

const RHFPropertyAutocomplete = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<ILabelForm>();
    return (
        <Controller
            name="resourceId"
            control={control}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error },
            }) => (
                <CodeSelect
                    {...field}
                    idValue={value}
                    onChange={(_, id) => onChange(id)}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            label={t("Property")}
                            error={Boolean(error)}
                            helperText={error?.message}
                        />
                    )}
                />
            )}
        />
    );
};

export default RHFPropertyAutocomplete;
