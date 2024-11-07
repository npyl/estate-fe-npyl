import { useCallback, useState } from "react";
import dayjs from "dayjs";
import {
    getAllDayStartEnd,
    isAllDay as getIsAllDay,
} from "@/components/Calendar/util";
import { useFormContext } from "react-hook-form";

/**
 * Hook that encapsulates control logic of EventDates component
 * @param initial Passed in "edit" cases
 */
const useEventDates = (
    startDateKey: string,
    endDateKey: string,
    initial?: { startDate: string; endDate: string }
) => {
    const { watch, setValue } = useFormContext();

    // INFO: is all day checkbox
    const _isAllDay = initial
        ? getIsAllDay(initial.startDate, initial.endDate)
        : false;
    const [isAllDay, setAllDay] = useState(_isAllDay);
    const onAllDayChange = useCallback(
        (_: any, b: boolean) => setAllDay(b),
        []
    );

    // INFO: date for when checked
    const [_allDayDate] = useState(initial?.startDate || dayjs().toISOString());
    const allDayDate = watch(startDateKey) || _allDayDate;
    const onAllDayDateChange = useCallback((s: string) => {
        // INFO: normalise dates if isAllDay
        const [start, end] = getAllDayStartEnd(s);

        setValue(startDateKey, start, { shouldDirty: true });
        setValue(endDateKey, end, { shouldDirty: true });
    }, []);

    return {
        _isAllDay,
        _allDayDate,
        // ...
        isAllDay,
        allDayDate,
        // ...
        onAllDayChange,
        onAllDayDateChange,
    };
};

export default useEventDates;
