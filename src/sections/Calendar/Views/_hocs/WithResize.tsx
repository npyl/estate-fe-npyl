import {
    CalendarCellProps,
    TOnEventResizeEnd,
} from "@/components/Calendar/types";
import { ComponentType, useCallback } from "react";
import { EVENTS, usePopperContext } from "../../View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithResize = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { dispatch } = usePopperContext();

        const onEventResizeEnd: TOnEventResizeEnd = useCallback(
            (ce, h) =>
                dispatch({
                    event: EVENTS.RESIZE_END,
                    // ...
                    other: {
                        ce,
                        h,
                    },
                }),
            []
        );

        return <Cell {...props} onEventResizeEnd={onEventResizeEnd} />;
    };

    WrappedComponent.displayName = `WithResize(Cell)`;

    return WrappedComponent;
};

export default WithResize;
