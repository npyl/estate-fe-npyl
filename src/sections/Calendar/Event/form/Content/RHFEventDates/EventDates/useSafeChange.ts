import { END_HOUR, START_HOUR } from "@/constants/calendar";
import dayjs from "dayjs";
import { useCallback, useMemo } from "react";

const getTime = (s: string) => new Date(s).getTime();

const useSafeChange = (
    startDate: string,
    endDate: string,
    _onStartDateChange: (v: string) => void,
    _onEndDateChange: (v: string) => void
) => {
    const s = useMemo(() => getTime(startDate), [startDate]);
    const e = useMemo(() => getTime(endDate), [endDate]);

    // --------------------------------------------------------------------

    const clearStartDate = useCallback(
        () =>
            _onStartDateChange(
                dayjs(startDate)
                    .hour(START_HOUR)
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toISOString()
            ),
        [startDate, _onStartDateChange]
    );

    const clearEndDate = useCallback(
        () =>
            _onEndDateChange(
                dayjs(endDate)
                    .hour(END_HOUR)
                    .minute(0)
                    .second(0)
                    .millisecond(0)
                    .toISOString()
            ),
        [endDate, _onEndDateChange]
    );

    // --------------------------------------------------------------------

    const onStartDateChange = useCallback(
        (v: string) => {
            _onStartDateChange(v);

            const c = getTime(v);
            if (c > e) clearEndDate();
        },
        [e, clearEndDate]
    );
    const onEndDateChange = useCallback(
        (v: string) => {
            _onEndDateChange(v);

            const c = getTime(v);
            if (c < s) clearStartDate();
        },
        [s, clearStartDate]
    );

    // --------------------------------------------------------------------

    return { onStartDateChange, onEndDateChange };
};

export default useSafeChange;
