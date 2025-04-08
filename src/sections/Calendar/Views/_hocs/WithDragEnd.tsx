import {
    CalendarCellProps,
    TOnEventDragEnd,
} from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";
import { EVENTS, usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDragEnd = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { dispatch } = usePopperContext();

        const handleDragEnd: TOnEventDragEnd = useCallback(
            (ce, startDate, endDate) =>
                dispatch({
                    event: EVENTS.DRAG_END,
                    // ...
                    other: {
                        ce,
                        startDate,
                        endDate,
                    },
                }),
            []
        );

        return <Cell {...props} onEventDragEnd={handleDragEnd} />;
    };

    WrappedComponent.displayName = `WithDragEnd(Cell)`;

    return WrappedComponent;
};

export default WithDragEnd;
