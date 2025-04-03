import {
    CalendarCellProps,
    TCalendarEvent,
    TOnEventClick,
} from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import { ComponentType, useCallback, useRef, useState } from "react";

const EventDialog = dynamic(() => import("@/sections/Calendar/Event/View"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithEventClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const anchorRef = useRef<HTMLDivElement>();

        const [event, setEvent] = useState<TCalendarEvent>();
        const closeDialog = useCallback(() => setEvent(undefined), []);

        const onEventClick: TOnEventClick = useCallback((ce, me) => {
            anchorRef.current = me.currentTarget;
            setEvent(ce);
        }, []);

        return (
            <>
                <Cell {...props} onEventClick={onEventClick} />

                {event ? (
                    <EventDialog
                        anchorEl={anchorRef.current}
                        event={event}
                        onClose={closeDialog}
                    />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithClick(Cell)`;

    return WrappedComponent;
};

export default WithEventClick;
