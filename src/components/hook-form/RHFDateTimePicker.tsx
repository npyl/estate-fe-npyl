import { Controller, useFormContext } from "react-hook-form";
import {
    DateTimePickerProps,
    DateTimePicker as MuiDateTimePicker,
} from "@mui/x-date-pickers";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";
import toLocalDate from "@/utils/toLocalDate";
import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";

interface Props extends DateTimePickerProps<dayjs.Dayjs> {
    name: string;
}

// INFO: value prop must be an LocalDate (YYYY-MM-DD)

const DatePicker = ({ name, onChange, ...others }: Props) => {
    const { control, setValue } = useFormContext();

    const handleChange = useCallback(
        (v: dayjs.Dayjs | null) =>
            setValue(name, toLocalDate(v?.toISOString() || ""), {
                shouldDirty: true,
            }),
        []
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { value, onChange: _, ...field },
                fieldState: { error },
            }) => (
                <>
                    <MuiDateTimePicker
                        {...field}
                        {...others}
                        value={value ? dayjs(value, LOCAL_DATE_FORMAT) : null}
                        onChange={onChange || handleChange}
                    />

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </>
            )}
        />
    );
};

export default DatePicker;
