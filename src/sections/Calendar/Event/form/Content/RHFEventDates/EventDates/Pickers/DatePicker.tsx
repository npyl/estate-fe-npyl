import { FC, useCallback } from "react";
import PPDatePicker, {
    DatePickerProps as PPDatePickerProps,
} from "@/components/Pickers/DatePicker";
import dayjs from "dayjs";

type OmitList = "localDate" | "value" | "onChangeISO" | "onChange";

interface DatePickerProps extends Omit<PPDatePickerProps, OmitList> {
    startDate: string;
    endDate: string;
    onStartDateChange: (d: string) => void;
    onEndDateChange: (d: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    ...props
}) => {
    const onChangeISO = useCallback(
        (v: string) => {
            const s = dayjs(startDate);
            const e = dayjs(endDate);

            const newStartDate = dayjs(v)
                .set("hour", s.get("hour"))
                .set("minute", s.get("minute"))
                .set("second", s.get("second"))
                .set("millisecond", s.get("millisecond"));

            const newEndDate = dayjs(v)
                .set("hour", e.get("hour"))
                .set("minute", e.get("minute"))
                .set("second", e.get("second"))
                .set("millisecond", e.get("millisecond"));

            onStartDateChange(newStartDate.toISOString());
            onEndDateChange(newEndDate.toISOString());
        },
        [startDate, endDate, onStartDateChange, onEndDateChange]
    );

    return (
        <PPDatePicker
            localDate={false}
            value={startDate}
            onChangeISO={onChangeISO}
            {...props}
        />
    );
};

export default DatePicker;
