// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { RHFTextFieldProps } from "@/components/hook-form/RHFTextField";
import { useDebouncedCallback } from "use-debounce";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";
import { codeIsUnique } from "@/sections/Properties/validators";

// ----------------------------------------------------------------------

export default function RHFCode({ name, ...other }: RHFTextFieldProps) {
    const { control, setError, clearErrors } = useFormContext();

    const { property } = useGetProperty();

    const debouncedCodeValidation = useDebouncedCallback(async (value) => {
        const result = await codeIsUnique(property?.code, value);

        if (result !== true) {
            setError("code", {
                type: "manual",
                message: result as string,
            });
        } else {
            clearErrors("code");
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
                        debouncedCodeValidation(e.target.value);
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
