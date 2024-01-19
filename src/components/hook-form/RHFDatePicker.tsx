// form
import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
// datepicker
import DatePicker, { DatePickerProps } from "src/components/DatePicker";

// ----------------------------------------------------------------------

type Props = DatePickerProps & {
    name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
    const { control, setValue, watch } = useFormContext();

    const date = watch(name);
    const [visibleDate, setVisibleDate] = useState<string>(date || "");

    // initial
    useEffect(
        () => setVisibleDate(date ? new Date(date).toDateString() : ""),
        [date]
    );

    const handleSelect = useCallback((dates: DateObject | DateObject[]) => {
        const date = (dates as DateObject).toDate();
        setValue(name, date.toISOString());
        setVisibleDate(date.toLocaleDateString());
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    value={visibleDate}
                    date={field.value}
                    error={!!error}
                    helperText={error?.message}
                    onSelect={handleSelect}
                    {...other}
                />
            )}
        />
    );
}
