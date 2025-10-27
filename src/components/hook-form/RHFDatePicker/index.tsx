import {
    Controller,
    ControllerRenderProps,
    FieldError,
    FieldValues,
    Path,
    useFormContext,
} from "react-hook-form";
import DatePicker, { DatePickerProps } from "@/components/Pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";
import { useCallback } from "react";

// --------------------------------------------------------------------------

type RenderProps<T extends FieldValues> = DatePickerProps & {
    label?: string;
    field: ControllerRenderProps<T, Path<T>>;
    error?: FieldError;
};

const Render = <T extends FieldValues>({
    field: { onChange: _onChange0, ...field },
    error,
    label,
    onChange: _onChange1,
    ...props
}: RenderProps<T>) => {
    const onChange = useCallback(
        (v: string) => {
            _onChange0(v);
            _onChange1?.(v);
        },
        [_onChange0, _onChange1]
    );

    return (
        <Stack spacing={1}>
            {label ? (
                <Typography variant="subtitle1">{label}</Typography>
            ) : null}
            <DatePicker {...field} onChange={onChange} {...props} />
            {error ? (
                <FormHelperText error>{error?.message}</FormHelperText>
            ) : null}
        </Stack>
    );
};

// --------------------------------------------------------------------------

interface RHFDatePickerProps<T extends FieldValues>
    extends Omit<DatePickerProps, "value"> {
    label?: string;
    name: Path<T>;
}

// INFO: value prop must be LocalDate (YYYY-MM-DD)

const RHFDatePicker = <T extends FieldValues>({
    name,
    label,
    ...props
}: RHFDatePickerProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Render<T>
                    label={label}
                    field={field}
                    error={error}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFDatePickerProps };
export default RHFDatePicker;
