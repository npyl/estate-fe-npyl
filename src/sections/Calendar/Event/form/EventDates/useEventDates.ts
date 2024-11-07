import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { isAllDay as getIsAllDay } from "@/components/Calendar/util";

/**
 * Hook that encapsulates control logic of EventDates component
 * @param initial Passed in "edit" cases
 * @returns
 */
const useEventDates = (initial?: { startDate: string; endDate: string }) => {
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
    const [allDayDate, onAllDayDateChange] = useState(_allDayDate);

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
