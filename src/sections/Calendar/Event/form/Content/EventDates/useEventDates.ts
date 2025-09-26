import { useCallback, useState } from "react";
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
    const { setValue, watch } = useFormContext();

    // INFO: is all day checkbox
    const _isAllDay = initial
        ? getIsAllDay(initial.startDate, initial.endDate)
        : false;
    const [isAllDay, setAllDay] = useState(_isAllDay);

    const onAllDayChange = useCallback((_: any, b: boolean) => {
        // INFO: when user checks all day make sure to initialise hook-form with values
        if (b) {
            const selected = watch(startDateKey);

            // INFO: priority:
            // - first initial (because it is most likely coming as a create/edit preselected date);
            // - then hook-form's value since the user most likely has chosen something;
            // - then a fallback (TODAY)
            const calculated =
                initial?.startDate || selected || TODAY.toISOString();

            const [start, end] = getAllDayStartEnd(calculated);

            setValue(startDateKey, start, { shouldDirty: true });
            setValue(endDateKey, end, { shouldDirty: true });
        }

        setAllDay(b);
    }, []);

    const isDirty = _isAllDay !== isAllDay;

    return {
        isDirty,
        // ...
        isAllDay,
        onAllDayChange,
    };
};

export default useEventDates;
