import { CalendarCellProps, TCalendarEvent } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { ComponentType, useCallback } from "react";
import { CREATE_EVENT_ID } from "./WithClick/useEventsWithCreate";
import { usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDragEnd = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { updateDates } = usePopperContext();

        const { user } = useAuth();
        const [updateEvent] = useUpdateEventMutation();

        const handleDragEnd = useCallback(
            (e: TCalendarEvent, startDate: string, endDate: string) => {
                if (e.id === CREATE_EVENT_ID) {
                    updateDates(startDate, endDate);
                } else {
                    updateEvent({
                        body: { ...e, startDate, endDate },
                        userId: user?.id!,
                    });
                }
            },
            []
        );

        return <Cell {...props} onEventDragEnd={handleDragEnd} />;
    };

    WrappedComponent.displayName = `WithDragEnd(Cell)`;

    return WrappedComponent;
};

export default WithDragEnd;
