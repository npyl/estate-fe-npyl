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
import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";

// --------------------------------------------------------------------------

const getSlotProps = (
    slotProps: DatePickerProps<dayjs.Dayjs>["slotProps"],
    dataTestId?: string
) => ({
    ...slotProps,
    textField: {
        ...slotProps?.textField,
        ...(dataTestId
            ? {
                  inputProps: {
                      "data-testid": dataTestId,
                  },
              }
            : {}),
    },
});

// --------------------------------------------------------------------------

interface Props
    extends Omit<DatePickerProps<dayjs.Dayjs>, "value" | "onChange"> {
    label?: string;
    name: string;
    onChange?: (v: string) => void;
}

// INFO: value prop must be an LocalDate (YYYY-MM-DD)

const DatePicker = ({ name, label, onChange, slotProps, ...others }: Props) => {
    const { control, setValue } = useFormContext();

    const dataTestId = (others as any)?.["data-testid"];

    const handleChange = useCallback(
        (v: dayjs.Dayjs | null) => {
            setValue(name, toLocalDate(v?.toISOString() || ""), {
                shouldDirty: true,
            });
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
                        value={value ? dayjs(value, LOCAL_DATE_FORMAT) : null}
                        onChange={handleChange}
                        {...field}
                        {...others}
                        slotProps={getSlotProps(slotProps, dataTestId)}
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
