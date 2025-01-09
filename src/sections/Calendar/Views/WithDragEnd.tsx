import { CalendarCellProps, TCalendarEvent } from "@/components/Calendar/types";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateEventMutation } from "@/services/calendar";
import { ComponentType, useCallback } from "react";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDragEnd = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { user } = useAuth();
        const [updateEvent] = useUpdateEventMutation();

        const handleDragEnd = useCallback(
            (e: TCalendarEvent, startDate: string, endDate: string) =>
                updateEvent({
                    body: { ...e, startDate, endDate },
                    userId: user?.id!,
                }),
            []
        );

        return <Cell {...props} onEventDragEnd={handleDragEnd} />;
    };

    WrappedComponent.displayName = `WithDragEnd(${
        Cell.displayName || Cell.name || "Component"
    })`;

    return WrappedComponent;
};

export default WithDragEnd;
