import {
    CalendarCellProps,
    TOnEventResizeEnd,
} from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { ComponentType, useCallback } from "react";
import { CREATE_EVENT_ID } from "./WithClick/useEventsWithCreate";
import { usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithResize = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { updateDates } = usePopperContext();

        const { user } = useAuth();
        const [updateEvent] = useUpdateEventMutation();

        const onEventResizeEnd: TOnEventResizeEnd = useCallback((e, h) => {
            // Convert h (pixel height) to hours
            const hoursDelta = h / 60;

            // Parse the startDate ISO string to a Date object
            const start = new Date(e.startDate);

            // Create a new Date for endDate by adding the calculated hours
            const end = new Date(start.getTime() + hoursDelta * 60 * 60 * 1000);

            // Convert endDate back to ISO string format
            const endDate = end.toISOString();

            if (e.id === CREATE_EVENT_ID) {
                updateDates(e.startDate, endDate);
            } else {
                updateEvent({
                    body: { ...e, endDate },
                    userId: user?.id!,
                });
            }
        }, []);

        return <Cell {...props} onEventResizeEnd={onEventResizeEnd} />;
    };

    WrappedComponent.displayName = `WithResize(Cell)`;

    return WrappedComponent;
};

export default WithResize;
