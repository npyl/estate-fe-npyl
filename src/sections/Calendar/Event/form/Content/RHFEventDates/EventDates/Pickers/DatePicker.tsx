import { FC, useCallback } from "react";
import { RHFDatePicker } from "@/components/hook-form";
import { getAllDayStartEnd } from "@/components/Calendar/util";
import { RHFDatePickerProps } from "@/components/hook-form/RHFDatePicker";
import dayjs from "dayjs";

interface DatePickerProps
    extends Omit<RHFDatePickerProps, "name" | "onChange"> {
    allDay: boolean;
    startDateKey: string;
    onEndDateChange: (d: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
    allDay,
    startDateKey,
    onEndDateChange,
    ...props
}) => {
    const handleChange = useCallback(
        (s: string) => {
            if (!allDay) return;

            const [_, end] = getAllDayStartEnd(s);
            onEndDateChange(end);
        },
        [allDay, onEndDateChange]
    );
    return (
        <RHFDatePicker
            name={startDateKey}
            defaultValue={dayjs()}
            onChange={handleChange}
            {...props}
        />
    );
};

export default DatePicker;
