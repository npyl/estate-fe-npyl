import {
    CalendarCellProps,
    TOnEventDragEnd,
} from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";
import { EVENTS, usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDrag = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { hidePopper, dispatch } = usePopperContext();

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

        return (
            <Cell
                {...props}
                onEventDragStart={hidePopper}
                onEventDragEnd={handleDragEnd}
            />
        );
    };

    WrappedComponent.displayName = `WithDrag(Cell)`;

    return WrappedComponent;
};

export default WithDrag;
