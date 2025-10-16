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
        () => _onStartDateChange(""),
        [_onStartDateChange]
    );

    const clearEndDate = useCallback(
        () => _onEndDateChange(""),
        [_onEndDateChange]
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
            console.log("onEndDateChange called with:", v);
            console.log("Current startDate:", startDate);
            _onEndDateChange(v);

            const c = getTime(v);
            const s = startDate ? getTime(startDate) : Infinity;
            console.log("Comparing:", c, "<", s, "?", c < s);
            if (c < s) {
                console.log("Clearing start date!");
                clearStartDate();
            }
        },
        [startDate, clearStartDate, _onEndDateChange]
    );

    // --------------------------------------------------------------------

    return { onStartDateChange, onEndDateChange };
};

export default useSafeChange;
