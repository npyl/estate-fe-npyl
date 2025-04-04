import { TCalendarEvent } from "@/components/Calendar/types";
import { useCallback, useMemo, useState, useLayoutEffect } from "react";
import { UpdateEvent } from "@/sections/Calendar/View/PopperContext/useExclusivePopper";
import { isSameDay } from "@/components/Calendar/util";

const CREATE_EVENT_ID = "PPEvent-Create";

const getEndDate = (startDate: string) => {
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    return endDate.toISOString();
};

const getEventWith = (startDate: string): TCalendarEvent => ({
    id: CREATE_EVENT_ID,
    startDate,
    endDate: getEndDate(startDate),
    title: "",
    type: "TASK",
    colorId: "",
    description: "",
    location: "",
    people: [],
});

const useEventsWithCreate = (cellDate: Date, _events: TCalendarEvent[]) => {
    const [startDate, setStartDate] = useState("");

    const events = useMemo(
        () => (startDate ? [..._events, getEventWith(startDate)] : _events),
        [_events, startDate]
    );

    const onUpdate = useCallback(
        (e: CustomEventInit<string>) => {
            try {
                const s = e.detail;
                if (!s) {
                    // INFO: eg. on popper close
                    setStartDate("");
                    return;
                }

                // INFO: make sure we are updating the current cell only
                const isCurrentCell = isSameDay(
                    new Date(s),
                    new Date(cellDate)
                );

                const res = isCurrentCell ? s : "";

                setStartDate(res);
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

export default useEventsWithCreate;
