import { useCallback, useState } from "react";
import dayjs from "dayjs";
import {
    getAllDayStartEnd,
    isAllDay as getIsAllDay,
} from "@/components/Calendar/util";
import { useFormContext } from "react-hook-form";
import { TODAY } from "@/components/BaseCalendar/constants";

/**
 * Hook that encapsulates control logic of EventDates component
 *
 * @param initial       Passed in "edit" cases
 * @param startDateKey  since we are using this hook in multiple react-hook-form contexts we need to make sure keys are correct
 * @param endDateKey    -||-
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
    const onAllDayChange = useCallback((_: any, b: boolean) => {
        // INFO: when user checks all day make sure to initialise hook-form with values
        if (b) {
            const [start, end] = getAllDayStartEnd(TODAY.toISOString());
            setValue(startDateKey, start, { shouldDirty: true });
            setValue(endDateKey, end, { shouldDirty: true });
        }

        setAllDay(b);
    }, []);

    // INFO: date for when checked
    const [_allDayDate] = useState(initial?.startDate || dayjs().toISOString());
    const allDayDate = watch(startDateKey) || _allDayDate;
    const onAllDayDateChange = useCallback((s: string) => {
        // INFO: normalise dates
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
