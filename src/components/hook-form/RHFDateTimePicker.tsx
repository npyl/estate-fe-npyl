import { Controller, useFormContext } from "react-hook-form";
import {
    DateTimePickerProps,
    DateTimePicker as MuiDateTimePicker,
} from "@mui/x-date-pickers";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";

/**
 * default onChange handler gives ISO string; otherwise use a custom one!
 */
interface Props extends DateTimePickerProps<dayjs.Dayjs> {
    name: string;
}

const DateTimePicker = ({ name, onChange, ...others }: Props) => {
    const { control, setValue } = useFormContext();

    const handleChange = useCallback(
        (v: dayjs.Dayjs | null) =>
            setValue(name, v?.toISOString() || "", {
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
                        value={value ? dayjs(value) : null}
                        onChange={onChange || handleChange}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                            },
                        }}
                    />

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </>
            )}
        />
    );
};

export default DateTimePicker;
