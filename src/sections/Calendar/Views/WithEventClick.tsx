import {
    CalendarCellProps,
    CalendarMouseEvent,
} from "@/components/Calendar/types";
import dynamic from "next/dynamic";
import { ComponentType, useCallback, useState } from "react";

const EventDialog = dynamic(() => import("@/sections/Calendar/Event/View"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithEventClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const [mouseEvent, setMouseEvent] = useState<CalendarMouseEvent>();
        const closeDialog = useCallback(() => setMouseEvent(undefined), []);

        return (
            <>
                <Cell {...props} onEventClick={setMouseEvent} />

                {mouseEvent ? (
                    <EventDialog
                        anchorEl={mouseEvent.target}
                        event={mouseEvent.currentTarget.event}
                        onClose={closeDialog}
                    />
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
