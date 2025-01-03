import { CalendarCellProps } from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDragEnd = (Cell: AnyCalendarCell) => {
    // INFO: Make sure to return a named component instead of an anonymous function
    const WrappedComponent = (props: CalendarCellProps) => {
        const handleDragEnd = useCallback(() => {
            console.log("ENA!!!!");
        }, []);

        return <Cell {...props} onEventDragEnd={handleDragEnd} />;
    };

    WrappedComponent.displayName = `WithDragEnd(${
        Cell.displayName || Cell.name || "Component"
    })`;

    return WrappedComponent;
};

export default WithDragEnd;
