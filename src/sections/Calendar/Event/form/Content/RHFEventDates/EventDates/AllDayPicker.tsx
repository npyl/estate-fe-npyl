import { FC, useCallback } from "react";
import { RHFDatePicker } from "@/components/hook-form";
import { getAllDayStartEnd } from "@/components/Calendar/util";
import { RHFDatePickerProps } from "@/components/hook-form/RHFDatePicker";

interface AllDayPickerProps
    extends Omit<RHFDatePickerProps, "name" | "onChange"> {
    startDateKey: string;
    onEndDateChange: (d: string) => void;
}

const AllDayPicker: FC<AllDayPickerProps> = ({
    startDateKey,
    onEndDateChange,
    ...props
}) => {
    const handleChange = useCallback(
        (s: string) => {
            const [_, end] = getAllDayStartEnd(s);
            onEndDateChange(end);
        },
        [onEndDateChange]
    );
    return (
        <RHFDatePicker name={startDateKey} onChange={handleChange} {...props} />
    );
};

export default AllDayPicker;
