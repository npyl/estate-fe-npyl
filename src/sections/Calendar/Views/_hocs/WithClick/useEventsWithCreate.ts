import { TCalendarEvent } from "@/components/Calendar/types";
import { useCallback, useMemo, useState, useLayoutEffect } from "react";
import { isSameDay } from "@/components/Calendar/util";
import { UpdateEvent } from "@/sections/Calendar/View/PopperContext/notifyCells";
import { DatesDetail } from "@/sections/Calendar/View/PopperContext/updateDates";

const CREATE_EVENT_ID = "PPEvent-Create";

const getEndDate = (startDate: string) => {
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    return endDate.toISOString();
};

/**
 * @param startDate -||-
 * @param endDate can be undefined (eg. when first clicking) Supports resize
 */
const getEventWith = (startDate: string, endDate?: string): TCalendarEvent => ({
    id: CREATE_EVENT_ID,
    startDate,
    endDate: !endDate ? getEndDate(startDate) : endDate,
    title: "",
    type: "TASK",
    colorId: "",
    description: "",
    location: "",
    people: [],
});

const useEventsWithCreate = (cellDate: Date, _events: TCalendarEvent[]) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const events = useMemo(
        () =>
            startDate
                ? [..._events, getEventWith(startDate, endDate)]
                : _events,
        [_events, startDate, endDate]
    );

    const onUpdate = useCallback(
        (e: CustomEventInit<DatesDetail>) => {
            try {
                const { startDate, endDate } = e.detail || {};
                if (!startDate) {
                    // INFO: eg. on popper close
                    setStartDate("");
                    setEndDate("");
                    return;
                }

                // INFO: make sure we are updating the current cell only
                const isCurrentCell = isSameDay(
                    new Date(startDate),
                    new Date(cellDate)
                );

                const res0 = isCurrentCell ? startDate : "";
                const res1 = isCurrentCell ? endDate || "" : "";

                setStartDate(res0);
                setEndDate(res1);
            } catch (ex) {}
        },
        [cellDate]
    );

    useLayoutEffect(() => {
        document.addEventListener(UpdateEvent, onUpdate);
        return () => {
            document.removeEventListener(UpdateEvent, onUpdate);
        };
    }, [onUpdate]);

    return events;
};

export { CREATE_EVENT_ID };
export default useEventsWithCreate;
