import { FC, useCallback } from "react";
import { getAllDayStartEnd } from "@/components/Calendar/util";
import PPDatePicker, {
    DatePickerProps as PPDatePickerProps,
} from "@/components/Pickers/DatePicker";
import dayjs from "dayjs";

interface DatePickerProps
    extends Omit<PPDatePickerProps, "onChangeISO" | "onChange"> {
    allDay: boolean;
    onEndDateChange: (d: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
    allDay,
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
        <PPDatePicker
            defaultValue={dayjs()}
            onChangeISO={handleChange}
            {...props}
        />
    );
};

export default DatePicker;
