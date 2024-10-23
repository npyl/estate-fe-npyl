import {
    CalendarDayViewProps,
    CalendarMonthViewProps,
    CalendarWeekViewProps,
    CalendarYearViewProps,
    TCalendarEvent,
} from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
const EventDialog = dynamic(() => import("@/sections/Calendar/Event/View"));

type AnyCalendarViewProps =
    | CalendarDayViewProps
    | CalendarWeekViewProps
    | CalendarMonthViewProps
    | CalendarYearViewProps;

type AnyCalendarView = ComponentType<AnyCalendarViewProps>;

const WithActions = (View: AnyCalendarView) => {
    const [event, setEvent] = useState<TCalendarEvent>();
    const closeDialog = () => setEvent(undefined);

    return (props: AnyCalendarViewProps) => (
        <>
            <View {...props} onEventClick={setEvent} />

            {event ? <EventDialog event={event} onClose={closeDialog} /> : null}
        </>
    );
};

export default WithActions;
