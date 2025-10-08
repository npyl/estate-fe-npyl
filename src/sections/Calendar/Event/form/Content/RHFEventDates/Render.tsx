import { FC, useCallback } from "react";
import EventDates, { EventDatesProps } from "./EventDates";
import {
    getAllDayStartEnd,
    isAllDay as getIsAllDay,
} from "@/components/Calendar/util";
import { TODAY } from "@/components/BaseCalendar/constants";

const getDates = (
    startDate: string,
    b: boolean
): readonly [string, string] | undefined => {
    // INFO: priority:
    // - hook-form's value since the user most likely has chosen something;
    // - then a fallback (TODAY)
    const calculated = startDate || TODAY.toISOString();

    if (b) {
        return getAllDayStartEnd(calculated);
    } else if (!b) {
        const start = new Date(calculated);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // Add 1 hour
        return [calculated, end.toISOString()];
    }
};

interface RenderProps
    extends Omit<EventDatesProps, "allDay" | "onAllDayChange"> {
    startDate: string;
    endDate: string;
    onStartDateChange: (d: string) => void;
    onEndDateChange: (d: string) => void;
}

const Render: FC<RenderProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    ...props
}) => {
    const allDay = getIsAllDay(startDate, endDate);

    const onAllDayChange = useCallback(
        (_: any, b: boolean) => {
            const res = getDates(startDate, b);
            if (!res) return;

            const [start, end] = res;
            onStartDateChange(start);
            onEndDateChange(end);
        },
        [startDate]
    );

    return (
        <EventDates
            allDay={allDay}
            onAllDayChange={onAllDayChange}
            {...props}
        />
    );
};

export type { RenderProps };
export default Render;
