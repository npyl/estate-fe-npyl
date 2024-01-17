// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
    name: string;
    adornment?: string;
};

export default function RHFOnlyNumbers({ name, adornment, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    value={
                        typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value || ""
                    }
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                        endAdornment: adornment ? (
                            <InputAdornment position="end">
                                {adornment}
                            </InputAdornment>
                        ) : null,
                    }}
                    {...other}
                />
            )}
        />
    );
}
