import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import CodeSelect from "@/sections/CodeSelect";
import { ILabelForm } from "../types";

const RHFPropertyAutocomplete = () => {
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
