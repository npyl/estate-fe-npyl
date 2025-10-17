import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import DatePicker, { DatePickerProps } from "@/components/Pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";

// --------------------------------------------------------------------------

interface RHFDatePickerProps<T extends FieldValues>
    extends Omit<DatePickerProps, "value" | "onChange"> {
    label?: string;
    name: Path<T>;
}

// INFO: value prop must be LocalDate (YYYY-MM-DD)

const RHFDatePicker = <T extends FieldValues>({
    name,
    label,
    ...others
}: RHFDatePickerProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Stack spacing={1}>
                    {label ? (
                        <Typography variant="subtitle1">{label}</Typography>
                    ) : null}
                    <DatePicker {...field} {...others} />
                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export type { RHFDatePickerProps };
export default RHFDatePicker;
