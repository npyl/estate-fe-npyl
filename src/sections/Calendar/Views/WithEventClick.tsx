import { CalendarCellProps, TCalendarEvent } from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";

const EventDialog = dynamic(() => import("@/sections/Calendar/Event/View"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithEventClick = (Cell: AnyCalendarCell) => {
    // INFO: Make sure to return a named component instead of an anonymous function
    const WrappedComponent = (props: CalendarCellProps) => {
        const [event, setEvent] = useState<TCalendarEvent>();
        const closeDialog = () => setEvent(undefined);

        return (
            <>
                <Cell {...props} onEventClick={setEvent} />
                {event ? (
                    <EventDialog event={event} onClose={closeDialog} />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithClick(${
        Cell.displayName || Cell.name || "Component"
    })`;

    return WrappedComponent;
};

export default WithEventClick;
