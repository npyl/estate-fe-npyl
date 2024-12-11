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
    // INFO: Make sure to return a named component instead of an anonymous function
    const WrappedComponent = (props: AnyCalendarViewProps) => {
        const [event, setEvent] = useState<TCalendarEvent>();
        const closeDialog = () => setEvent(undefined);

        return (
            <>
                <View {...props} onEventClick={setEvent} />
                {event ? (
                    <EventDialog event={event} onClose={closeDialog} />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithActions(${
        View.displayName || View.name || "Component"
    })`;

    return WrappedComponent;
};

export default WithActions;
