import { CalendarCellProps } from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDragEnd = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const handleDragEnd = useCallback(
            (startDate: string, endDate: string) => {
                console.log("start: ", startDate, " \nend: ", endDate);
            },
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
