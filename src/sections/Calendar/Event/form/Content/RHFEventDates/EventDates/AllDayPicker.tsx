import { FC, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RHFDatePicker } from "@/components/hook-form";
import { getAllDayStartEnd } from "@/components/Calendar/util";

interface StartEndDatePickerProps {
    startDateKey: string;
    onEndDateChange: (d: string) => void;
}

const StartEndDatePicker: FC<StartEndDatePickerProps> = ({
    startDateKey,
    onEndDateChange,
}) => {
    const handleChange = useCallback(
        (s: string) => {
            const [_, end] = getAllDayStartEnd(s);
            onEndDateChange(end);
        },
        [onEndDateChange]
    );
    return <RHFDatePicker name={startDateKey} onChange={handleChange} />;
};

interface AllDayPickerProps {
    startDateKey: string;
    endDateKey: string;
}

const AllDayPicker: FC<AllDayPickerProps> = ({ startDateKey, endDateKey }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={endDateKey}
            control={control}
            render={({ field: { onChange } }) => (
                <StartEndDatePicker
                    startDateKey={startDateKey}
                    onEndDateChange={onChange}
                />
            )}
        />
    );
};

export default AllDayPicker;
