import {
    CalendarCellProps,
    TOnEventDragEnd,
    TOnEventDragStart,
} from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";
import { EVENTS, usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithDrag = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { dispatch } = usePopperContext();

        const onDragStart: TOnEventDragStart = useCallback(
            () =>
                dispatch({
                    event: EVENTS.DRAG_START,
                    other: undefined,
                }),
            []
        );

        const onDragEnd: TOnEventDragEnd = useCallback(
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
                onEventDragStart={onDragStart}
                onEventDragEnd={onDragEnd}
            />
        );
    };

    WrappedComponent.displayName = `WithDrag(Cell)`;

    return WrappedComponent;
};

export default WithDrag;
