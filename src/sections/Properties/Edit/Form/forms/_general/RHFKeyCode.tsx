// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { RHFTextFieldProps } from "@/components/hook-form/RHFTextField";
import { useDebouncedCallback } from "use-debounce";
import { keyCodeIsUnique } from "@/sections/Properties/validators";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";

// ----------------------------------------------------------------------

export default function RHFKeyCode({ name, ...other }: RHFTextFieldProps) {
    const { control, setError, clearErrors } = useFormContext();

    const { property } = useGetProperty();

    const debouncedKeyCodeValidation = useDebouncedCallback(async (value) => {
        const result = await keyCodeIsUnique(property?.keyCode || null, value);
        if (result !== true) {
            setError("keyCode", {
                type: "manual",
                message: result as string,
            });
        } else {
            clearErrors("keyCode");
        }
    }, 250);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    onChange={(e) => {
                        field.onChange(e);
                        debouncedKeyCodeValidation(e.target.value);
                    }}
                    value={
                        typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value || ""
                    }
                    error={!!error}
                    helperText={error?.message ?? ""}
                    {...other}
                />
            )}
        />
    );
}
