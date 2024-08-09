import { Controller, useFormContext } from "react-hook-form";
import {
    DatePickerProps,
    DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { FormHelperText, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";
import toLocalDate from "@/utils/toLocalDate";

const LOCAL_DATE_FORMAT = "YYYY-MM-DD";
const EUROPEAN_DATE_FORMAT = "DD/MM/YYYY";

interface Props extends Omit<DatePickerProps<dayjs.Dayjs>, "onChange"> {
    label?: string;
    name: string;
    onChange?: (v: string) => void;
}

// INFO: value prop must be an LocalDate (YYYY-MM-DD)

const DatePicker = ({ name, label, onChange, ...others }: Props) => {
    const { control, setValue } = useFormContext();

    const handleChange = useCallback(
        (v: dayjs.Dayjs | null) => {
            setValue(name, toLocalDate(v?.toISOString() || ""));
            onChange?.(v?.toISOString() || "");
        },
        [onChange]
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value, onChange: _, ...field },
                fieldState: { error },
            }) => (
                <Stack spacing={1}>
                    {label ? (
                        <Typography variant="subtitle1">{label}</Typography>
                    ) : null}
                    <MuiDatePicker
                        {...field}
                        {...others}
                        value={value ? dayjs(value, LOCAL_DATE_FORMAT) : null}
                        format={EUROPEAN_DATE_FORMAT}
                        onChange={handleChange}
                    />
                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default DatePicker;
